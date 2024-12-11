package laser_beam.hanabi_tanks;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
@RequestMapping("/")
public class Redirect 
{
    @GetMapping()
    public String RedirectMethod() 
    {
        return "html/Main.html";
    }
}
