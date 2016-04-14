package envirosense.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import envirosense.model.Event;
import envirosense.repository.EventRepository;

@Service
@Transactional
public class EventService {
	@Autowired
	EventRepository eventRepository;
	
	/**
	 * Enables the event with specified ID
	 * @param id The ID of the event to be enabled
	 * @return <code>true</code> if the operation executed successfully, return <code>false</code> otherwise
	 */
	public boolean enableEvent(long id) {
		Event event = eventRepository.getOne(id);
		if (event == null) {
			return false;
		}
		event.setActive(true);
		eventRepository.save(event);
		return true;
	}
	
	/**
	 * Disables the event with specified ID
	 * @param id The ID of the event to be disabled
	 * @return <code>true</code> if the operation executed successfully, return <code>false</code> otherwise
	 */
	public boolean disableEvent(long id) {
		Event event = eventRepository.getOne(id);
		if (event == null) {
			return false;
		}
		event.setActive(false);
		eventRepository.save(event);
		return true;
	}
	
	/**
	 * Adds a new event
	 * @param event The event to be added
	 * @return The added event
	 */
	public Event addEvent(Event event) {
		event.setId(0);
		return eventRepository.save(event);
	}
	
	/**
	 * Retrieves and returns the event with specified ID
	 * @param id The ID of the event to retrieve
	 * @return The retrieved event
	 */
	public boolean removeEvent(long id) {
		Event event = eventRepository.getOne(id);
		if (event == null) {
			return false;
		}
		eventRepository.delete(event);
		return true;
	}
	
	/**
	 * Retrieves and returns all events
	 * @return All events
	 */
	public List<Event> findAll() {
		return eventRepository.findAll();
	}

	/**
	 * Retrieves all events with the specified name
	 * @param name The name of the events to retrieve
	 * @return The retrieved events
	 */
	public List<Event> findByName(String name) {
		return eventRepository.findByName(name);
	}

	/**
	 * Retrieves and returns all active events
	 * @return All active events
	 */
	public List<Event> findByActiveTrue() {
		return eventRepository.findByActiveTrue();
	}

	/**
	 * Retrieves and returns all inactive events
	 * @return All inactive events
	 */
	public List<Event> findByActiveFalse() {
		return eventRepository.findByActiveFalse();
	}
	
	/**
	 * Retrieves all events that this user has
	 * @param email The email of the user whose events are to be retrieved
	 * @return The retrieved events
	 */
	public List<Event> findByUserEmail(String email) {
		return eventRepository.findByUserEmail(email);
	}


	/**
	 * Retrieves all active events that this user has
	 * @param email The email of the user whose events are to be retrieved
	 * @return The retrieved events
	 */
	public List<Event> findByUserEmailActive(String email) {
		return eventRepository.findByUserEmailActive(email);
	}

	/**
	 * Retrieves all inactive events that this user has
	 * @param email The email of the user whose events are to be retrieved
	 * @return The retrieved events
	 */
	public List<Event> findByUserEmailInactive(String email) {
		return eventRepository.findByUserEmailInactive(email);
	}
}