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

/**
 * Controller for managing events via HTTP calls
 */
@RestController
@RequestMapping("/api/event")
public class EventApiController {

	@Autowired
	EventService eventService;

	/**
	 * Enables the event with specified ID
	 * @param id The ID of the event that is to be enabled
	 * @return An HTTP response status
	 */
	@RequestMapping(value = "/enable/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> enableEvent(@PathVariable("id") long id) {
		eventService.enableEvent(id);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	/**
	 * Disables the event with specified ID
	 * @param id The ID of the event that is to be disabled
	 * @return An HTTP response status
	 */
	@RequestMapping(value = "/disable/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> diableEvent(@PathVariable("id") long id) {
		eventService.disableEvent(id);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	/**
	 * Creates a new event
	 * @param event The new event
	 * @param binding A binding result
	 * @return An HTTP response status
	 */
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

	/**
	 * Deletes the event with the specified ID
	 * @param id The ID of the event to delete 
	 * @return An HTTP response status
	 */
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> deleteEvent(@PathVariable("id") long id) {
		eventService.removeEvent(id);
		return new ResponseEntity<>("", HttpStatus.OK);
	}
	
	/**
	 * Retrieves and returns all events in the system
	 * @return All events in the system and an HTTP status code
	 */
	@RequestMapping(value = "/all")
	public ResponseEntity<List<Event>> getAll() {
		List<Event> events = eventService.findAll();
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	/**
	 * Retrieves and returns all active events in the system
	 * @return All active events in the system and an HTTP status code
	 */
	@RequestMapping(value = "/active")
	public ResponseEntity<List<Event>> getActive() {
		List<Event> events = eventService.findByActiveTrue();
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	/**
	 * Retrieves and returns all inactive events in the system
	 * @return All inactive events in the system and an HTTP status code
	 */
	@RequestMapping(value = "/inactive")
	public ResponseEntity<List<Event>> getInactive() {
		List<Event> events = eventService.findByActiveFalse();
		return new ResponseEntity<>(events, HttpStatus.OK);
	}
}