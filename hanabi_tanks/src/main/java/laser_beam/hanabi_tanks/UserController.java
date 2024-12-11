package laser_beam.hanabi_tanks;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/users")
public class UserController 
{
    @Autowired
    private final UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }
    

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserDTO(@RequestParam String username) 
    {
        return ResponseEntity.ok(new User(username, "myPassword",0, 0));
    }

    @PostMapping("")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user) 
    {
        return ResponseEntity.ok(this.userService.registerUser(user).get());
    }

    @DeleteMapping("/{username}")
    public boolean deleteUser(@PathVariable String username)
    {
        return this.userService.deleteUser(username);
    }
}
