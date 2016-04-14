package envirosense.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import envirosense.model.User;
import net.gpedro.integrations.slack.SlackApi;
import net.gpedro.integrations.slack.SlackMessage;

/**
 * This service class is used for sending messages to users via Slack
 */
@Service("slackNotifier")
public class SlackNotifier implements CommunicationMethod {

	private static final Logger logger = Logger.getLogger(SlackNotifier.class);

	@Autowired
	private SlackApi slackApi;
	
	@Value("${slack.commonroom}")
	private String commonRoom;
	
	@Value("${slack.botname}")
	private String botName;

	@Override
	public boolean sendMessage(User receivingUser, String message) {
		SlackMessage slackMessage = new SlackMessage("@" + receivingUser.getSlackId(), botName, message);
		
		try {
			slackApi.call(slackMessage);
		// Although not documented, call can throw a runtime exception, return false if that happens
		} catch (RuntimeException rex) {
			logger.error("There was a problem sending a slack message", rex);
			return false;
		}
		return true;
	}
}
