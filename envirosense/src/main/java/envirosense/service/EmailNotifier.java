package envirosense.service;


import org.springframework.stereotype.Service;

import envirosense.model.User;


/**
 * This service class is used for sending messages to users via email
 * 
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
@Service("emailNotifier")
public class EmailNotifier implements CommunicationMethod {

	@Override
	public boolean sendMessage(final User receivingUser, String message) {
		// TODO: Implementation
		return false;
	}
}