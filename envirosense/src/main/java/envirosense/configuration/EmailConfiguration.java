package envirosense.configuration;


import java.util.Properties;

import javax.annotation.Resource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
@PropertySource("classpath:application.properties")
public class EmailConfiguration {
	
	public static final String PROPERTY_NAME_MAIL_PROTOCOL = "mail.transport.protocol";
	public static final String PROPERTY_NAME_MAIL_HOST = "mail.smtps.host";
	public static final String PROPERTY_NAME_MAIL_PORT = "mail.smtps.port";
	public static final String PROPERTY_NAME_MAIL_AUTH = "mail.smtps.auth";

	public static final String PROPERTY_NAME_MAIL_USERNAME = "mail.username";
	public static final String PROPERTY_NAME_MAIL_PASSWORD = "mail.password";
	public static final String PROPERTY_NAME_MAIL_FROM = "mail.from";

	@Resource
	private Environment env;
	
	@Bean
	public JavaMailSender javaMailService() {
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
		Properties mailProperties = new Properties();
		mailProperties.put(PROPERTY_NAME_MAIL_PROTOCOL, env.getRequiredProperty(PROPERTY_NAME_MAIL_PROTOCOL));
		mailProperties.put(PROPERTY_NAME_MAIL_HOST, env.getRequiredProperty(PROPERTY_NAME_MAIL_HOST));
		mailProperties.put(PROPERTY_NAME_MAIL_PORT, env.getRequiredProperty(PROPERTY_NAME_MAIL_PORT));
		mailProperties.put(PROPERTY_NAME_MAIL_AUTH, env.getRequiredProperty(PROPERTY_NAME_MAIL_AUTH));

		javaMailSender.setJavaMailProperties(mailProperties);
		javaMailSender.setUsername(env.getRequiredProperty(PROPERTY_NAME_MAIL_USERNAME));
		javaMailSender.setPassword(env.getRequiredProperty(PROPERTY_NAME_MAIL_PASSWORD));
		
		return javaMailSender;
	}
}