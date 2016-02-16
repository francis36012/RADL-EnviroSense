package envirosense.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Event;
import envirosense.repository.EventRepository;

@Service
public class EventService {
	@Autowired
	EventRepository eventRepository;
	
	public boolean enableEvent(final Event event) {
		event.setActive(true);
		return true;
	}
	
	public boolean disableEvent(final Event event) {
		event.setActive(false);
		return true;
	}
	
	public Event addEvent(Event event) {
		event.setId(0);
		return eventRepository.save(event);
	}
	
	public boolean removeEvent(Event event) throws IllegalArgumentException {
		eventRepository.delete(event);
		return true;
	}
}