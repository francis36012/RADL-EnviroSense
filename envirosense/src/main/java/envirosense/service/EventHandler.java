package envirosense.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.List;

import envirosense.model.Condition;
import envirosense.model.Event;
import envirosense.model.User;
import envirosense.model.dto.SensorDataDTO;
import envirosense.repository.EventRepository;

/**
 * Filter incoming and send notifications for the ones that satisfy an events conditions.
 */
@Component
@Scope("singleton")
public class EventHandler {
	@Autowired
	EventRepository eventRepository;
	
	@Autowired
	EmailNotifier emailNotifier;
	
	@Autowired
	SlackNotifier slackNotifier;
	

	/**
	 * Creates an <code>EventHandler</code> object
	 */
	public EventHandler() {
	}

	/**
	 * Runs the handler on the specified data
	 * @param data The data on which the handler will run
	 */
	public void run(List<SensorDataDTO> data) {
		List<Event> events = eventRepository.findByActiveTrue();
		for (SensorDataDTO d : data) {
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(d.getTimestamp());

			for (Event e : events) {
				boolean allConditionsValid = true;
				for (Condition c : e.getConditions()) {
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
			result = slackNotifier.sendMessage(user, event.getMessage());
		}
		if (event.isUsePhone()) {
		}
		if (event.isUseEmail()) {
			result = emailNotifier.sendMessage(user, event.getMessage());
		}
		return result;
	}
}