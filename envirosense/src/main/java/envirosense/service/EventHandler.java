package envirosense.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.List;

import envirosense.model.Condition;
import envirosense.model.Event;
import envirosense.model.SensorData;
import envirosense.model.User;
import envirosense.repository.EventRepository;

/**
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
@Component
@Scope("singleton")
public class EventHandler {
	@Autowired
	EventRepository eventRepository;
	
	@Autowired
	EmailNotifier emailNotifier;
	

	/**
	 * Creates an <code>EventHandler</code> object
	 */
	public EventHandler() {
	}

	public void run(List<SensorData> data) {
		List<Event> events = eventRepository.findByActiveTrue();
		for (SensorData d : data) {
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(d.getTimestamp());

			for (Event e : events) {
				boolean allConditionsValid = true;
				for (Condition c : e.getConditions()) {
					// TODO: Use data
					if (!c.evaluate(d.getData(), calendar)) {
						allConditionsValid = false;
					}
				}
				if (allConditionsValid) {
					for (User u : e.getOwners()) {
						sendNotification(u, e);
					}
				}
			}
		}
	}
	
	/**
	 * Sends the message contained in the event to the specified user. The
	 * channel used for sending the message depends on which ones are set to be used.
	 * 
	 * @param user The user to send the message to.
	 * @param event The event whose message is to be sent
	 * @return <code>true</code> if the message was sent successfully on all set channels, <code>false</code>
	 * if otherwise.
	 */
	private boolean sendNotification(User user, Event event) {
		boolean result = true;
		if (event.isUseSlack()) {
		}
		if (event.isUsePhone()) {
		}
		if (event.isUseEmail()) {
			result = emailNotifier.sendMessage(user, event.getMessage());
		}
		return result;
	}
}