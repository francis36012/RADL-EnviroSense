package envirosense.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Event;
import envirosense.repository.EventRepository;

@Service
public class EventService {
	@Autowired
	EventRepository eventRepository;
	
	public boolean enableEvent(long id) {
		Event event = eventRepository.getOne(id);
		if (event == null) {
			return false;
		}
		event.setActive(true);
		eventRepository.save(event);
		return true;
	}
	
	public boolean disableEvent(long id) {
		Event event = eventRepository.getOne(id);
		if (event == null) {
			return false;
		}
		event.setActive(false);
		eventRepository.save(event);
		return true;
	}
	
	public Event addEvent(Event event) {
		event.setId(0);
		return eventRepository.save(event);
	}
	
	public boolean removeEvent(long id) {
		Event event = eventRepository.getOne(id);
		if (event == null) {
			return false;
		}
		eventRepository.delete(event);
		return true;
	}
	
	public List<Event> findAll() {
		return eventRepository.findAll();
	}

	public List<Event> findByName(String name) {
		return eventRepository.findByName(name);
	}

	public List<Event> findByActiveTrue() {
		return eventRepository.findByActiveTrue();
	}

	public List<Event> findByActiveFalse() {
		return eventRepository.findByActiveFalse();
	}
	
	public List<Event> findByUserEmail(String email) {
		return eventRepository.findByUserEmail(email);
	}

	public List<Event> findByUserEmailActive(String email) {
		return eventRepository.findByUserEmailActive(email);
	}

	public List<Event> findByUserEmailInactive(String email) {
		return eventRepository.findByUserEmailInactive(email);
	}
}