package envirosense.controller;

import envirosense.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author Daniel Chau
 */
@Controller
public class UserController {

    @Autowired
    UserService userServiceImpl;

    @RequestMapping(value = "/login")
    public ModelAndView login() {
        return new ModelAndView("login");
    }
    
    @RequestMapping(value = "/loginerror", method = RequestMethod.GET)
    public ModelAndView loginerror() {
    	return new ModelAndView("redirect:/login?error");
    }
    
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null){    
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return new ModelAndView("redirect:/login?logout");
    }
}
