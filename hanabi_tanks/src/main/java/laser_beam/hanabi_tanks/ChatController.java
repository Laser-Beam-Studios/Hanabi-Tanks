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

    public ChatController() 
    { 
        this.lock = new ReentrantReadWriteLock();
        this.maxMessageCache = 100;
    }

    @GetMapping("")
    public ChatResponse getMethodName(@RequestParam(defaultValue = "0") int since) 
    {
        var readLock = this.lock.readLock();
        readLock.lock();
        try
        {
            List<String> messagesToReturn = new ArrayList<>();
            int lastId = since;

            for (ChatMessage message : this.messages)
            {
                if (message.id() >= since)
                {
                    messagesToReturn.add(message.message());
                    lastId = message.id();
                }
            }
            return new ChatResponse(messagesToReturn, lastId);
        }
        finally
        {
            readLock.unlock();
        }
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> postMethodName(@RequestParam String message) 
    {
        var writeLock = this.lock.writeLock();
        writeLock.lock();
        try
        {
            if (this.messages.add(new ChatMessage(message.trim(), this.lastId.incrementAndGet())))
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
        private final int lastId;

        public ChatResponse(List<String> messages, int lastId)
        {
            this.messages = messages;
            this.lastId = lastId;
        }
        public List<String> getMessages() { return this.messages; }
        public int getLastId() { return this.lastId; }

    }
}
