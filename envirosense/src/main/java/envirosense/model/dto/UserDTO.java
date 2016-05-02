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

	public UserDTO() {
	}

	public UserDTO(String firstname, String lastname, String email, String phone, String slackId,
			String password, boolean enabled, Set<Event> events, Set<Role> roles) {
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

	public static UserDTO mapNoPassword(final User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.email = user.getEmail();
		userDTO.firstname = user.getFirstname();
		userDTO.lastname = user.getLastname();
		userDTO.phone = user.getPhone();
		userDTO.slackId = user.getSlackId();
		userDTO.enabled = user.getEnabled();
		userDTO.roles = user.getRoles();
		
		return userDTO;
	}
	
	public static User mapNewUser(final UserDTO userDTO) {
		User user = new User(userDTO.firstname, userDTO.lastname, userDTO.email,
				userDTO.phone, userDTO.slackId, userDTO.password, null,
				userDTO.enabled, userDTO.roles);
		return user;
	}
}