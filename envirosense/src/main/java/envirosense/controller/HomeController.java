package envirosense.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController
{
	@RequestMapping(value = {"/", "/index", "/home"}, method = RequestMethod.GET)
	public ModelAndView homePage()
	{
		return new ModelAndView("index");
	}
}
