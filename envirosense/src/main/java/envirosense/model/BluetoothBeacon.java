package envirosense.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "bluetooth_beacon")
public class BluetoothBeacon implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	@Column(name = "user_email")
	private String user;

	public BluetoothBeacon(long id, String user) {
		super();
		this.id = id;
		this.user = user;
	}
	
	public BluetoothBeacon() {
	}

	public long getId() {
		return id;
	}

	public String getUser() {
		return user;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setUser(String user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int)(id ^ (id >>> 32));
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
		BluetoothBeacon other = (BluetoothBeacon)obj;
		if (id != other.id)
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
}