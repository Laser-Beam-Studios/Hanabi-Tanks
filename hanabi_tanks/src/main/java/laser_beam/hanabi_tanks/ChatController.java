package laser_beam.hanabi_tanks;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;



@RestController
@RequestMapping("/api/chat")
public class ChatController 
{
    private final List<ChatMessage> messages = new ArrayList<>();
    private final AtomicInteger lastId = new AtomicInteger(-1);
    private final int maxMessageCache;
    private ReentrantReadWriteLock lock;
    private UserService userService;

    public ChatController(UserService userService) 
    { 
        this.lock = new ReentrantReadWriteLock();
        this.maxMessageCache = 100;
        this.userService = userService;
    }

    @GetMapping("")
    public ChatResponse getMessages(@RequestParam(defaultValue = "0") int since, @RequestParam String username) 
    {
        var readLock = this.lock.readLock();
        readLock.lock();
        try
        {
            this.userService.setLastSeenByUsername(username);
            List<String> messagesToReturn = new ArrayList<>();
            List<String> usernames = new ArrayList<>();
            int lastId = since;

            for (ChatMessage message : this.messages)
            {
                if (message.id() >= since)
                {
                    messagesToReturn.add(message.message());
                    usernames.add(message.username());
                    lastId = message.id();
                }
            }
            return new ChatResponse(messagesToReturn, usernames, lastId);
        }
        finally
        {
            readLock.unlock();
        }
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> sendMessage(@RequestParam(name = "message") String message, @RequestParam(name = "username") String username) 
    {
        var writeLock = this.lock.writeLock();
        writeLock.lock();
        try
        {
            if (!this.userService.getAllUsernames().contains(username)) return new ResponseEntity<>(HttpStatus.CONFLICT);

            this.userService.setLastSeenByUsername(username);

            if (this.messages.add(new ChatMessage(message.trim(), username, this.lastId.incrementAndGet())))
            {
                System.out.println("The message id is: " + this.lastId);
                if (this.messages.size() > this.maxMessageCache)
                {
                    this.messages.remove(0);
                }
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else
            {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
        finally
        {
            writeLock.unlock();
        }
    }
    

    public static class ChatResponse
    {
        private final List<String> messages;
        private final List<String> usernames;
        private final int lastId;

        public ChatResponse(List<String> messages, List<String> usernames, int lastId)
        {
            this.messages = messages;
            this.usernames = usernames;
            this.lastId = lastId;
        }
        public List<String> getMessages() { return this.messages; }
        public int getLastId() { return this.lastId; }
        public List<String> getUsernames() { return this.usernames; }
    }
}
