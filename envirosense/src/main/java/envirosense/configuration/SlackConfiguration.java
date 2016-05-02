package envirosense.configuration;


import javax.annotation.Resource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import net.gpedro.integrations.slack.SlackApi;

@Configuration
@PropertySource("classpath:application.properties")
public class SlackConfiguration {
	
	public static final String PROPERTY_NAME_SLACK_WEBHOOK_URL = "slack.hookurl";

	@Resource
	private Environment env;
	
	@Bean
	public SlackApi slackApi() {
		String hookUrl = env.getRequiredProperty(PROPERTY_NAME_SLACK_WEBHOOK_URL);
		SlackApi slackApi = new SlackApi(hookUrl);

		return slackApi;
	}
}