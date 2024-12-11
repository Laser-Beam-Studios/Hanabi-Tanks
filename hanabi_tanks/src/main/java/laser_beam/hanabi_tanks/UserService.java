package laser_beam.hanabi_tanks;

import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock.WriteLock;

import org.springframework.beans.factory.annotation.Autowired;

public class UserService 
{
    @Autowired
    private UserDAO userDAO;

    private final ReentrantReadWriteLock lock;

    public UserService(UserDAO userDAO)
    {
        this.lock = new ReentrantReadWriteLock();
        this.userDAO = userDAO;
    }

    public Optional<UserDTO> getUserDTO(String username)
    {
        return this.userDAO.getUserDTOByName(username);
    }

    public Optional<UserDTO> registerUser(User newUser)
    {
        return this.userDAO.updateUser(newUser);
    }

    public boolean deleteUser(String username)
    {
        WriteLock writeLock = lock.writeLock();
        writeLock.lock();
        try
        {
            return this.userDAO.deleteUser(username);
        }
        finally
        {
            writeLock.unlock();
        }
    }
}
