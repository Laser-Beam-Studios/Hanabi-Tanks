package laser_beam.hanabi_tanks;

import java.util.HashSet;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HTWebSocketHandler extends TextWebSocketHandler
{
    // enum Orders
    // {
    //     Ejemplo1(7),
    //     Ejemplo2(14);

    //     private final int value;

    //     Orders(int value)
    //     {
    //         this.value = value;
    //     }

    //     public int getValue()
    //     {
    //         return value;
    //     }

    //     public static Orders fromValue(int value)
    //     {
    //         for (Orders order : Orders.values()) 
    //         {
    //             if (order.getValue() == value)
    //                 return  order;
    //         }

    //         throw new IllegalArgumentException("Value not found: " + value);
    //     }
    // }

    private String DefaultLobby = "NoLobby";
    private int createdLobbyCode = 1;
    private int joinedLobbyCode = 3;
    private int abandonedLobbyCode = 5;

    private int codeLenght = 7;
    private int codeVariance = 2;

    private Map<String, Set<WebSocketSession>> lobbies;
    private Map<WebSocketSession, String> sessions;

    public HTWebSocketHandler()
    {
        lobbies = new ConcurrentHashMap<>();
        lobbies.put(DefaultLobby, new HashSet<>());
        sessions = new ConcurrentHashMap<>();
    }

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception 
    {
        lobbies.get(DefaultLobby).add(session);
        sessions.put(session, DefaultLobby);
	}

    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception 
    {
        lobbies.get(sessions.get(session)).remove(session);
        sessions.remove(session);
	}

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        if (!sessions.containsKey(session))
            return;
        
        JsonNode node;
        switch ((node = (new ObjectMapper()).readTree(message.getPayload())).get("code").asInt())
        {
            case 0 -> // Join Lobby
            {
                String newLobby = node.get("additionalInfo").asText();
                String oldLobby = sessions.put(session, newLobby);
                lobbies.get(oldLobby).remove(session);
                lobbies.get(newLobby).add(session);
                session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", joinedLobbyCode).put("additionalInfo", newLobby).asText()));
            }

            case 1 -> // Create Lobby
            {
                boolean exists;
                String lobbyCode;
                do { 
                    lobbyCode = generateCode();
                    exists = lobbies.containsKey(lobbyCode);
                } while (exists);
                sessions.put(session, lobbyCode);
                lobbies.put(lobbyCode, new HashSet<>()).add(session);
                session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", createdLobbyCode).put("additionalInfo", lobbyCode).asText()));
                return;
            }

            case 2 -> // Abandon Lobby
            {
                lobbies.get(sessions.remove(session)).remove(session);
                session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", abandonedLobbyCode).asText()));
            }
        }
        
        for (WebSocketSession client : lobbies.get(sessions.get(session))) 
        {
            if (client == session)
                continue;

            client.sendMessage(message);
        }
    }

    private String generateCode()
    {
        String caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder codigo = new StringBuilder();
        Random random = new Random();

        int realCodeLenght = codeLenght + random.nextInt(codeVariance * 2) - codeVariance;
        for (int i = 0; i < realCodeLenght; i++) {
            int index = random.nextInt(caracteres.length());
            codigo.append(caracteres.charAt(index));
        }

        return codigo.toString();
    }
}