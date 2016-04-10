package envirosense.model.dto;

import java.util.Set;

import envirosense.model.Event;
import envirosense.model.Role;
import envirosense.model.User;

public class UserDTO {

	private String firstname;
	private String lastname;
	private String email;
	private String phone;
	private String slackId;
	private String password;
	private boolean enabled;
	private Set<Role> roles;
	private Set<Event> events;

	public UserDTO() {
	}

	/**
	 * Creates a user object
	 * 
	 * @param firstname The first name of the user object to be created
	 * @param lastname The last name of the user object to be created
	 * @param email The email address of the user object to be created
	 * @param phone The phone number of the user object to be created
	 * @param slackId The slack ID (or username) of the user object to be created
	 * @param password The password of the user object to be created
	 * @param enabled A boolean flag indicating whether the user object to be created is enabled
	 * @param roles The roles associated with the user
	 */
	public UserDTO(String firstname, String lastname, String email, String phone, String slackId,
			String password, boolean enabled, Set<Role> roles) {
		this.email = email;
		this.firstname = firstname;
		this.lastname = lastname;
		this.phone = phone;
		this.slackId = slackId;
		this.password = password;
		this.enabled = enabled;
		this.roles = roles;
	}

	public UserDTO(User user) throws NullPointerException {
		if (user == null) {
			throw new NullPointerException("");
		}

		this.email = user.getEmail();
		this.firstname = user.getFirstname();
		this.lastname = user.getLastname();
		this.phone = user.getPhone();
		this.slackId = user.getSlackId();
		this.password = user.getPassword();
		this.enabled = user.getEnabled();
		this.roles = user.getRoles();
	}

	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public String getEmail() {
		return email;
	}

	public String getPhone() {
		return phone;
	}

	public String getSlackId() {
		return slackId;
	}

	public String getPassword() {
		return password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public Set<Event> getEvents() {
		return events;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setSlackId(String slackId) {
		this.slackId = slackId;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public void setEvents(Set<Event> events) {
		this.events = events;
	}
}