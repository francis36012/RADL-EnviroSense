package envirosense.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controllers for mapping the home page of the application
 *
 * @author Daniel Chau
 */
@Controller
public class HomeController {

    /**
     * Directs to the home page view using the specified mapping
     * @return the home page view
     */
    @RequestMapping(value = {"/", "/index", "/home"}, method = RequestMethod.GET)
    public ModelAndView homePage() {
        return new ModelAndView("index");
    }
}
