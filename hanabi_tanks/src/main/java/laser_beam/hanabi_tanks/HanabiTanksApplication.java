package laser_beam.hanabi_tanks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HanabiTanksApplication 
{
	@Bean(name = "usersPath")
	public String getUserPath()
	{
		return "data/users";
	}

	@Bean
	public UserDAO getUserDAO(String usersPath)
	{
		return new UserDAO(usersPath);
	}

	@Bean
	public UserService getUserService(UserDAO userDAO)
	{
		return new UserService(userDAO);
	}

	public static void main(String[] args) 
	{
		SpringApplication.run(HanabiTanksApplication.class, args);
	}

}
