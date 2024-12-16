package laser_beam.hanabi_tanks;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDTO 
{
    private String username;
    private int numberOfVictories;
    private long lastSeen;

    @JsonCreator
    public UserDTO(@JsonProperty("username") String username, @JsonProperty("numberOfVictories") int numberOfVictories, @JsonProperty("lastSeen") long lastSeen)
    {
        this.username = username;
        this.numberOfVictories = numberOfVictories;
        this.lastSeen = lastSeen;
    }

    public UserDTO(User user)
    {
        this.username = user.getUsername();
        this.numberOfVictories = user.getNumberOfVictories();
        this.lastSeen = user.getLastSeen();
    }

    public String getUsername() { return this.username; }
    public long getLastSeen() { return this.lastSeen; }
    public int getNumberOfVictories() { return this.numberOfVictories; }

    public void setLastSeen(long lastSeen) { this.lastSeen = lastSeen; }
}