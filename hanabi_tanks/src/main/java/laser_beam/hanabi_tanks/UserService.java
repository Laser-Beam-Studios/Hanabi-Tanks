package laser_beam.hanabi_tanks;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

public class UserService 
{
    @Autowired
    private UserDAO userDAO;

    public UserService(UserDAO userDAO)
    {
        this.userDAO = userDAO;
    }

    public Optional<UserDTO> getUserDTO(String username)
    {
        return this.userDAO.getUserDTOByName(username);
    }

    public int getUsersConnected(int maxTimeSinceLastSeen)
    {
        return this.userDAO.getUsersConnected(maxTimeSinceLastSeen);
    }

    public Optional<UserDTO> registerUser(User newUser)
    {
        return this.userDAO.updateUser(newUser);
    }

    public boolean deleteUser(String username)
    {
        return this.userDAO.deleteUser(username);
    }

    public boolean modifyUser(String username, UserDTO userDTO)
    {
        return this.userDAO.modifyUser(username, userDTO);
    }
}
