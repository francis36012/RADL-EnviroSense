package envirosense.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller to map the login screen for the application
 *
 * @author Daniel Chau
 */
@Controller
public class LoginController {

    /**
     * Directs to the login view using the /login mapping
     * @return the login view
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login() {
        return new ModelAndView("login");
    }

}
