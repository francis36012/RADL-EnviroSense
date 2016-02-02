/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package envirosense.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Standard User Object
 * @author Daniel Chau
 */
@Entity
@Table(name = "user")
public class User {

	/**
	 * The first name of the user
	 */
	private String firstname;

	/**
	 * The last name of the user
	 */
	private String lastname;
	
	/**
	 * The email address of the user.
	 * It is used for identifying the user and also for sending email notifications.
	 */
	@Id
	@Column(unique = true)
	private String email;

	/**
	 * The phone number of the user.
	 * It is used for sending SMS notifications
	 */
	private String phone;

	/**
	 * The Slack ID (or username) of a user
	 * Used for sending notifications to the user through Slack
	 */
	private String slackId;

	/**
	 * The password of the user.
	 * It used for authenticating the user into the system
	 */
	@JsonIgnore
	private String password;

	/**
	 * A flag that indicates whether a user is active in the system
	 */
	private boolean enabled;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "user_role",
		joinColumns = {@JoinColumn(name = "user_email")},
		inverseJoinColumns = {@JoinColumn(name = "user_role")}
	)
	private Set<Role> roles;

	/**
	 * Creates a user object
	 * @param firstname The first name of the user object to be created
	 * @param lastname The last name of the user object to be created
	 * @param email The email address of the user object to be created
	 * @param phone The phone number of the user object to be created
	 * @param slackId The slack ID (or username) of the user object to be created
	 * @param password The password of the user object to be created
	 * @param enabled  A boolean flag indicating whether the user object to be created is enabled
	 * @param roles
	 */
	public User(String firstname, String lastname, String email, String phone,
				String slackId, String password, boolean enabled, Set<Role> roles)
	{
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.phone = phone;
		this.slackId = slackId;
		this.password = password;
		this.enabled = enabled;
		this.roles = roles;
	}

	public User(User user) throws NullPointerException
	{
		if (user == null) {
			throw new NullPointerException("");
		}

		this.email = user.email;
		this.firstname = user.firstname;
		this.lastname = user.lastname;
		this.phone = user.phone;
		this.slackId = user.slackId;
		this.password = user.password;
		this.enabled = user.enabled;
		this.roles = user.roles;
	}

	protected User()
	{
	}

	/**
	 * Returns the email address of the user object
	 * @return The email address of a user object.
	 */
	public String getEmail()
	{
		return email;
	}

	/**
	 * Returns the first name of the user object.
	 * @return The first name of the user object.
	 */
	public String getFirstname()
	{
		return firstname;
	}

	/**
	 * Returns the last name of the user object.
	 * @return The last name of the user object.
	 */
	public String getLastname()
	{
		return lastname;
	}

	/**
	 * Returns the phone number of the user object.
	 * @return The phone number of the user object.
	 */
	public String getPhone()
	{
		return phone;
	}

	/**
	 * Returns the slack ID (or username) of the user object.
	 * @return the slack ID (or username) of the user object.
	 */
	public String getSlackId()
	{
		return slackId;
	}
	
	/**
	 * Returns the password of the user object.
	 * @return the password of the user object.
	 */
	public String getPassword()
	{
		return password;
	}
	
	/**
	 * Returns the status flag of the user object.
	 * @return <code>true</code> if the user is active, <code>false</code> if otherwise.
	 */
	public boolean getEnabled()
	{
		return enabled;
	}

	public Set<Role> getRoles()
	{
		return roles;
	}

	/**
	 * Sets the email address of the user object.
	 * @param email The email address to set.
	 */
	public void setEmail(String email)
	{
		this.email = email;
	}

	/**
	 * Sets the first name of the user object.
	 * @param firstname The first name to set
	 */
	public void setFirstname(String firstname)
	{
		this.firstname = firstname;
	}

	/**
	 * Sets the last name of the user object.
	 * @param lastname The last name to set
	 */
	public void setLastname(String lastname)
	{
		this.lastname = lastname;
	}

	/**
	 * Sets the phone number of the user object.
	 * @param phone  The phone number to set
	 */
	public void setPhone(String phone)
	{
		this.phone = phone;
	}

	/**
	 * Sets the Slack ID (or username) of the user object.
	 * @param slackId The Slack ID (or username) to set.
	 */
	public void setSlackId(String slackId)
	{
		this.slackId = slackId;
	}
	
	/**
	 * Sets the password of the user object.
	 * @param password The password to set
	 */
	public void setPassword(String password)
	{
		this.password = password;
	}
	
	/**
	 * Sets the status flag of a user in the system.
	 * @param state A boolean indicating the status of a user in the system.
	 * <code>true</code> for active, <code>false</code> for inactive
	 */
	public void setEnabled(boolean state)
	{
		this.enabled = state;
	}

	public void setRoles(Set<Role> roles)
	{
		this.roles = roles;
	}
}
