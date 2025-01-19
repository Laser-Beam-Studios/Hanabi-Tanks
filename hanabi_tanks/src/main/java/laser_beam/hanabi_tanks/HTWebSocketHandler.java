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
    private int host = 6;

    private int codeLenght = 7;
    private int codeVariance = 2;

    private int maxPlayersInLobby = 2;

    private Map<String, Set<WebSocketSession>> lobbies;
    private Map<String, WebSocketSession> hosts;
    private Map<WebSocketSession, String> sessions;

    public HTWebSocketHandler()
    {
        lobbies = new ConcurrentHashMap<>();
        lobbies.put(DefaultLobby, new HashSet<>());
        sessions = new ConcurrentHashMap<>();
        hosts = new ConcurrentHashMap<>();
    }

    @Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception 
    {
        try
        {
            lobbies.get(DefaultLobby).add(session);
            sessions.put(session, DefaultLobby);
        }
        catch (Exception e)
        {
            System.out.println(e);
            session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", abandonedLobbyCode).toString()));
        }
	}

    @Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception 
    {
        try
        {

        
        String oldLobby = sessions.remove(session);
        lobbies.get(oldLobby).remove(session); 
        if (hosts.get(oldLobby) == session)
            migrateHost(oldLobby, lobbies.get(oldLobby));
        }
        catch (Exception e)
        {
            System.out.println(e);            
            session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", abandonedLobbyCode).toString()));
        }
	}

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception
    {
        try
        {

        
        if (!sessions.containsKey(session))
            return;
        
        JsonNode node;
        switch ((node = (new ObjectMapper()).readTree(message.getPayload())).get("code").asInt())
        {
            case 0 -> // Create Lobby
            {
                // try
                // {                
                boolean exists;
                String lobbyCode;
                do { 
                    lobbyCode = generateCode();
                    exists = lobbies.containsKey(lobbyCode);
                } while (exists);
                String oldLobby = sessions.put(session, lobbyCode);
                lobbies.get(oldLobby).remove(session);
                lobbies.put(lobbyCode, new HashSet<>());
                lobbies.get(lobbyCode).add(session);
                hosts.put(lobbyCode, session);
                session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", createdLobbyCode).put("additionalInfo", lobbyCode).toString()));
                // }
                // catch (Exception e)
                // {
                //     e.printStackTrace();
                // } 
                return;
            }

            case 2 -> // Join Lobby
            {
                String newLobby = node.get("additionalInfo").asText();
                if (lobbies.get(newLobby).size() + 1 > maxPlayersInLobby)
                    return;
                String oldLobby = sessions.put(session, newLobby);
                lobbies.get(oldLobby).remove(session);
                lobbies.get(newLobby).add(session);
                session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", joinedLobbyCode).put("additionalInfo", lobbies.get(newLobby).size()).toString()));
                break;
            }            

            case 4 -> // Abandon Lobby
            {
                //lobbies.get(sessions.remove(session)).remove(session);
                String oldLobby = sessions.put(session, DefaultLobby);
                lobbies.get(oldLobby).remove(session);
                lobbies.get(DefaultLobby).add(session);
                session.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", abandonedLobbyCode).put("additionalInfo", node.get("additionalInfo").asText()).toString()));               
                if (lobbies.get(oldLobby).isEmpty())
                {
                    System.out.println("Lobby is empty. Delete.");
                    lobbies.remove(oldLobby);
                    return;
                }
                
                if (hosts.get(oldLobby) == session)
                    migrateHost(oldLobby, lobbies.get(oldLobby));

                    for (WebSocketSession client : lobbies.get(oldLobby)) 
        {
            if (client == session)
                continue;
            System.out.println("Notifiying other clients");
            client.sendMessage(message);
        }
                break;
            }
        }  

        for (WebSocketSession client : lobbies.get(sessions.get(session))) 
        {
            if (client == session)
                continue;
            System.out.println("Notifiying other clients");
            client.sendMessage(message);
        }
    }
    catch (Exception e)
    {
        System.out.println(e);
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

    private void migrateHost(String lobbyCode, Set<WebSocketSession> clients) throws Exception
    {
        WebSocketSession chosedClient;
        hosts.put(lobbyCode, (chosedClient = (WebSocketSession)clients.toArray()[(new Random()).nextInt(clients.size())]));   
        System.out.println(chosedClient);     
        chosedClient.sendMessage(new TextMessage((new ObjectMapper()).createObjectNode().put("code", host).toString()));
    }
}