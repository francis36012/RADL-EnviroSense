package envirosense.controller;


import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import envirosense.service.EventService;

@Controller
public class EventController {
	
	@Autowired
	EventService eventService;
	
	@RequestMapping(value = "/admin/events", method = RequestMethod.GET)
	public ModelAndView adminAllEvents() {
		ModelAndView mv = new ModelAndView("admin/events");

		mv.addObject("events", eventService.findAll());
		return mv;
	}
	
	@RequestMapping(value = "/events", method = RequestMethod.GET)
	public ModelAndView userAllEvents(Principal principal) {
		ModelAndView mv = new ModelAndView("events");
		final String user = principal.getName();
		
		mv.addObject("events", eventService.findByUserEmail(user));
		
		return mv;
	}
}