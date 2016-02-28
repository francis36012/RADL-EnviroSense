package envirosense.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.Event;
import envirosense.service.EventService;

@RestController
@RequestMapping("/api/event")
public class EventApiController {

	@Autowired
	EventService eventService;

	@RequestMapping(value = "/enable/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> enableEvent(@PathVariable("id") long id) {
		eventService.enableEvent(id);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/disable/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> diableEvent(@PathVariable("id") long id) {
		eventService.disableEvent(id);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/new", method = RequestMethod.POST,
		consumes = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<String> newEvent(@RequestBody Event event, BindingResult binding) {
		if (binding.hasErrors()) {
			return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
		}
		eventService.addEvent(event);
		return new ResponseEntity<>("", HttpStatus.OK);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> deleteEvent(@PathVariable("id") long id) {
		eventService.removeEvent(id);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/all")
	public ResponseEntity<List<Event>> getAll() {
		List<Event> events = eventService.findAll();
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@RequestMapping(value = "/active")
	public ResponseEntity<List<Event>> getActive() {
		List<Event> events = eventService.findByActiveTrue();
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@RequestMapping(value = "/inactive")
	public ResponseEntity<List<Event>> getInactive() {
		List<Event> events = eventService.findByActiveFalse();
		return new ResponseEntity<>(events, HttpStatus.OK);
	}
}