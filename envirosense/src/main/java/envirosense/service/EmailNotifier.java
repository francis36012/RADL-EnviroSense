package envirosense.service;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import envirosense.model.User;


/**
 * This service class is used for sending messages to users via email
 */
@Service("emailNotifier")
public class EmailNotifier implements CommunicationMethod {

	private static final Logger logger = Logger.getLogger(EmailNotifier.class);

	@Autowired
	JavaMailSender mailSender;
	
	@Value("${mail.from}")
	String from;
	
	@Override
	public boolean sendMessage(final User receivingUser, String message) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setFrom(from);
		mailMessage.setTo(receivingUser.getEmail());
		mailMessage.setText(message);
		
		try {
			mailSender.send(mailMessage);
		} catch (MailParseException mpex) {
			logger.error("There was a problem parsing the messages", mpex);
			return false;
		} catch (MailAuthenticationException maex) {
			logger.error("There was an authentication problem", maex);
			return false;
		} catch (MailSendException msex) {
			logger.error("There was an sending the message", msex);
			return false;
		}
		return true;
	}
}