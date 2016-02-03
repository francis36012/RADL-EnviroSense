package envirosense.configuration;


import envirosense.service.UserDetailsAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{
	@Autowired
	private UserDetailsAuthService userDetailsAuth;

	@Bean
	public Md5PasswordEncoder md5PasswordEncoder()
	{
		return new Md5PasswordEncoder();
	}

	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception
	{
		auth.userDetailsService(userDetailsAuth);
		auth.authenticationProvider(authenticationProvider());
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider()
	{
	    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
	    authenticationProvider.setUserDetailsService(userDetailsAuth);
	    authenticationProvider.setPasswordEncoder(md5PasswordEncoder());
	    return authenticationProvider;
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception
	{
		http.authorizeRequests()
			.antMatchers("/admin/**").access("hasRole('ADMIN')")
			.antMatchers("/").access("hasRole('USER')")
			.and()
		.formLogin()
			.loginPage("/login")
			.usernameParameter("email")
			.passwordParameter("password")
			.failureUrl("/loginerror")
			.and()
		.csrf()
			.and()
		.exceptionHandling()
			.accessDeniedPage("/403");
	}
}