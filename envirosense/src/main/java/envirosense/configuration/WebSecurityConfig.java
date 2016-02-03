/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package envirosense.configuration;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 *
 * @author Daniel Chau
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource dataSource;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers("/admin/**").hasRole("ADMIN")
                    .antMatchers("/", "/**").hasRole("USER")
                    .and()
                .formLogin().loginPage("/login")
                    .permitAll().failureUrl("/login?error")
                    .usernameParameter("email").passwordParameter("password")
                    .and()
                .logout()
                    .permitAll().logoutSuccessUrl("/login?logout")
                    .and()
                .exceptionHandling().accessDeniedPage("/Access_Denied")
                    .and()
                .csrf()
                
                ;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .jdbcAuthentication()
                    .dataSource(dataSource)
                    .usersByUsernameQuery("SELECT email, password, enabled FROM user where email=?")
                    .authoritiesByUsernameQuery("SELECT user_email, user_role FROM user_role where user_email=?")
                ;
    }
}
