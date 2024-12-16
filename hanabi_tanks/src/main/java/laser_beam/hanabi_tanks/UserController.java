package laser_beam.hanabi_tanks;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/api/users")
public class UserController 
{
    @Autowired
    private final UserService userService;

    private final int maxTimeSinceLastSeen;

    public UserController(UserService userService)
    {
        this.userService = userService;
        this.maxTimeSinceLastSeen = 30; // is in seconds
    }
    

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserDTO(@PathVariable String username) 
    {
        UserDTO userDTO = this.userService.getUserDTO(username).get();
        System.out.println("The User DTO is: " + userDTO);
        return (userDTO.getUsername() != "" && userDTO.getNumberOfVictories() != -1)? ResponseEntity.ok(userDTO) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/connected")
    public int getUsersConnected() 
    {
        return this.userService.getUsersConnected(this.maxTimeSinceLastSeen);
    }
    

    @PostMapping("")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user) 
    {
        return ResponseEntity.ok(this.userService.registerUser(user).get());
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username)
    {
        return (this.userService.deleteUser(username))? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> IncrementVictories(@PathVariable String username) 
    {
        return (this.userService.IncrementVictories(username))? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/")
    public ResponseEntity<?> loginUser(@RequestParam(name = "username") String username, @RequestParam(name = "password") String password) 
    {
        return (this.userService.loginUser(username, password))? new ResponseEntity<>(HttpStatus.OK) : new ResponseEntity<>(HttpStatus.CONFLICT);
    }
}
