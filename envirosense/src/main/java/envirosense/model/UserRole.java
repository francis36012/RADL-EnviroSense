package envirosense.model;


import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * A UserRole is used to determine which actions a user can perform on the system.
 * 
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
@Entity
@Table(name = "user_role")
public class UserRole implements Serializable {
	@Transient
	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne
	@JoinColumn(name = "user_role")
	private Role role;

	@Id
	@ManyToOne
	@JoinColumn(name = "user_email")
	private User user;

	public UserRole(User user, Role role) {
		this.role = role;
		this.user = user;
	}

	protected UserRole() {
	}

	public String getUserEmail() {
		return user.getEmail();
	}

	public Role getRole() {
		return role;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserRole other = (UserRole)obj;
		if (role == null) {
			if (other.role != null)
				return false;
		} else if (!role.equals(other.role))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
}