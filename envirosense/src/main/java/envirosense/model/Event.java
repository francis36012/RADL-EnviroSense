package envirosense.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "event")
public class Event implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	private long id;
	
	@Column(unique = true)
	private String name;
	
	private String message;
	
	@Column(name = "use_slack")
	private boolean useSlack;

	@Column(name = "use_email")
	private boolean useEmail;

	@Column(name = "use_phone")
	private boolean usePhone;
	
	private boolean active;

	@ManyToMany(mappedBy = "events")
	private Set<User> owners;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "event_condition", joinColumns = {@JoinColumn(name = "event_id")},
			   inverseJoinColumns = {@JoinColumn(name = "condition_id")})
	private Set<Condition> conditions;

	public Event(long id, String name, String message, boolean useSlack, boolean useEmail,
			boolean usePhone, boolean active, Set<User> owners, Set<Condition> conditions) {
		this.id = id;
		this.name = name;
		this.message = message;
		this.useSlack = useSlack;
		this.useEmail = useEmail;
		this.usePhone = usePhone;
		this.active = active;
		this.owners = owners;
		this.conditions = conditions;
	}
	
	public Event() {
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getMessage() {
		return message;
	}

	public boolean isUseSlack() {
		return useSlack;
	}

	public boolean isUseEmail() {
		return useEmail;
	}

	public boolean isUsePhone() {
		return usePhone;
	}

	public boolean isActive() {
		return active;
	}

	public Set<User> getOwners() {
		return owners;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setUseSlack(boolean useSlack) {
		this.useSlack = useSlack;
	}

	public void setUseEmail(boolean useEmail) {
		this.useEmail = useEmail;
	}

	public void setUsePhone(boolean usePhone) {
		this.usePhone = usePhone;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public void setOwners(Set<User> owners) {
		this.owners = owners;
	}
}