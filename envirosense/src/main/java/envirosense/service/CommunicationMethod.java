package envirosense.service;


import envirosense.model.User;

/**
 * A service for sending messages to users.
 * Information for the message destination is can be found in a user object.
 * 
 * @author Francis Agyapong
 */
public interface CommunicationMethod {

	/**
	 * Sends the a message to the specified user with message as the content
	 * 
	 * @param receivingUser The user that the message will be sent to
	 * @param message The content of the message
	 * @return True if the send was successful, false if otherwise
	 */
	public boolean sendMessage(final User receivingUser, String message);
}