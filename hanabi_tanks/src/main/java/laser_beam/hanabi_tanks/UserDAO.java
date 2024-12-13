package laser_beam.hanabi_tanks;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Hashtable;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class UserDAO 
{
    @Autowired
    @Qualifier("usersPath")
    private String usersPath;

    public UserDAO(String usersPath) 
    {
        this.usersPath = usersPath;
        this.objectMapper = new ObjectMapper();
        this.lock = new ReentrantReadWriteLock();
        this.users = new Hashtable<String, User>();
        List<User> tempUsers = getAllUsersInDisk();
        for (int i = 0; i < tempUsers.size(); i++)
        {
            this.users.put(tempUsers.get(i).getUsername(), tempUsers.get(i));
        }
        System.out.println("initialization users number: " + this.users.size() + ", In the userDAO instance: " + this);
    }

    private ReentrantReadWriteLock lock;
    private Hashtable<String, User> users;

    @Autowired
    private ObjectMapper objectMapper;

    private List<User> getAllUsersInDisk() 
    {

        Path path = Paths.get(usersPath);

        // Use Stream API to map files directly to User objects and collect them into a
        // list
        try
        {
            return Files.list(path) // List all files in the directory
                    .filter(Files::isRegularFile) // Ensure that only files are processed
                    .filter(file -> file.toString().endsWith(".json")) // Only consider .json files
                    .map(file -> 
                    {
                        try 
                        {
                            // Read the content of the JSON file and convert it to a User object
                            return this.objectMapper.readValue(file.toFile(), User.class);
                        } 
                        catch (IOException e) 
                        {
                            e.printStackTrace(); // Handle the error appropriately
                            return null; // Return null in case of an error
                        }
                    })
                    .filter(user -> user != null) // Filter out any null values in case of errors
                    .collect(Collectors.toList()); // Collect the results into a List
        }
        catch (IOException e) 
        {
            e.printStackTrace(); // Handle the error appropriately
            return null; // Return null in case of an error
        }
    }

    public Optional<UserDTO> getUserDTOByName(String username)
    {
        var readlock = this.lock.readLock();
        readlock.lock();
        try
        {
            // Construct the file path dynamically based on the username
            String filePath = this.usersPath + "/" + username + ".json";
            File file = new File(filePath);
            // Read the file and return it has a UserDTO
            return Optional.of(new UserDTO(this.objectMapper.readValue(file, User.class)));
        } 
        catch (IOException e) 
        {
            e.printStackTrace();
            return Optional.of(new UserDTO("", -1, 0));
        }
        finally
        {
            readlock.unlock();
        }
    }

    public int getUsersConnected(int maxTimeSinceLastSeen)
    {
        int connected = 0;
        Collection<User> temp = this.users.values();
        for (User user : temp)
        {
            if (user.getLastSeen() <= maxTimeSinceLastSeen) connected++;
        }
        return connected;
    }

    // Method to update the User in the JSON file
    public Optional<UserDTO> updateUser(User updatedUser) 
    {
        var writeLock = this.lock.writeLock();
        writeLock.lock();
        try 
        {
            // Construct the file path dynamically based on the username
            String filePath = this.usersPath + "/" + updatedUser.getUsername() + ".json";
            File file = new File(filePath);

            // Write in the hash table if not exist yet, if exist just modify his values
            this.users.put(updatedUser.getUsername(), updatedUser);
            // Update the json file for have the consistency up to date in every registration
            this.objectMapper.writeValue(file, updatedUser);
            return Optional.of(new UserDTO(updatedUser));
        } 
        catch (IOException e) 
        {
            e.printStackTrace();
            return Optional.of(null);
        }
        finally
        {
            writeLock.unlock();
        }
    }

    public boolean modifyUser(String username, UserDTO userDTO)
    {
        var writeLock = this.lock.writeLock();
        writeLock.lock();
        try 
        {
            // Construct the file path dynamically based on the username
            String filePath = this.usersPath + "/" + username + ".json";
            File file = new File(filePath);

            // modify the user
            this.users.put(userDTO.getUsername(), new User(userDTO, this.getUserPassword(username)));
            System.out.println(this.users.size());
            // Create the new User object for modify the json, if it's the same username
            objectMapper.writeValue(file, this.users.get(userDTO.getUsername()));
            return true;
        } 
        catch (IOException e) 
        {
            e.printStackTrace();
            return false;
        }
        finally
        {
            writeLock.unlock();
        }
    }

    private String getUserPassword(String username)
    {
        var readlock = this.lock.readLock();
        readlock.lock();
        try
        {
            // Construct the file path dynamically based on the username
            String filePath = this.usersPath + "/" + username + ".json";
            File file = new File(filePath);
            // Read the file and return it has a UserDTO
            return this.objectMapper.readValue(file, User.class).getPassword();
        } 
        catch (IOException e) 
        {
            e.printStackTrace();
            return "";
        }
        finally
        {
            readlock.unlock();
        }
    }

    // Method to delete the User from the JSON file
    public boolean deleteUser(String username) 
    {
        var writeLock = this.lock.writeLock();
        writeLock.lock();
        try {
            // Construct the file path dynamically based on the username
            String filePath = this.usersPath + "/" + username + ".json";
            File file = new File(filePath);

            System.out.println(this.users.get(username));

            if (this.users.get(username) == null) 
            {
                return false; // File does not exist, return false
            }

            // Delete the file and delete the user in the hashtable
            this.users.remove(username);
            return file.delete();
        }
        catch (Exception e) 
        {
            e.printStackTrace();
            return false; // Error occurred while deleting the file
        }
        finally
        {
            writeLock.unlock();
        }
    }
}
