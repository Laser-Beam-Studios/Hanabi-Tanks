package laser_beam.hanabi_tanks;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User 
{
    private String username;
    private String password;
    private int numberOfVictories;
    private long lastSeen;


    @JsonCreator
    public User(@JsonProperty("username") String username, @JsonProperty("password") String password, @JsonProperty("numberOfVictories") int numberOfVictories, @JsonProperty("lastSeen") long lastSeen)
    {
        this.username = username;
        this.password = password;
        this.numberOfVictories = numberOfVictories;
        this.lastSeen = lastSeen;
    }

    public User(UserDTO userDTO, String password)
    {
        this.username = userDTO.getUsername();
        this.numberOfVictories = userDTO.getNumberOfVictories();
        this.password = password;
        this.lastSeen = userDTO.getLastSeen();
    }

    public String getPassword() { return this.password; }
    public String getUsername() { return this.username; }
    public long getLastSeen() { return this.lastSeen; }
    public int getNumberOfVictories() { return this.numberOfVictories; }

    public boolean setUsername(String newUsername, String password)
    {
        if (this.password == password)
        {
            this.username = newUsername;
            return true;
        }
        return false;
    }

    public boolean setLastSeen(long lastSeen, String password)
    {
        if (this.password == password)
        {
            this.lastSeen = lastSeen;
            return true;
        }
        return false;
    }

    public boolean setNumberOfVictories(int numberOfVictories, String password)
    {
        if (this.password == password)
        {
            this.numberOfVictories = numberOfVictories;
            return true;
        }
        return false;
    }

    public boolean equals() {return true;}
}
