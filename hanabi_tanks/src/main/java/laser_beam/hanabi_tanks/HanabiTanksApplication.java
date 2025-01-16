package laser_beam.hanabi_tanks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class HanabiTanksApplication implements WebSocketConfigurer
{
	@Bean(name = "usersPath")
	public String getUserPath()
	{
		return "data/users";
	}

	@Bean(name = "userDAO")
	public UserDAO getUserDAO(String usersPath)
	{
		return new UserDAO(usersPath);
	}

	@Bean
	public UserService getUserService(UserDAO userDAO)
	{
		return new UserService(userDAO);
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry)
	{
		registry.addHandler(createWebSocketHandler(), "/api/comms").setAllowedOrigins("*");
	}

	@Bean
	public HTWebSocketHandler createWebSocketHandler()
	{
		return new HTWebSocketHandler();
	}

	public static void main(String[] args) 
	{
		SpringApplication.run(HanabiTanksApplication.class, args);
	}

}
