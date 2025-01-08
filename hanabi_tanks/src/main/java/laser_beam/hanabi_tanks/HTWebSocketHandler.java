package laser_beam.hanabi_tanks;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class HTWebSocketHandler extends TextWebSocketHandler
{
    private Map<String, List<WebSocketSession>> sesions;

    public HTWebSocketHandler()
    {
        sesions = new ConcurrentHashMap<>();
    }

    @Override
    public void handleTextMessage(WebSocketSession client, TextMessage message) throws Exception
    {

    }
}