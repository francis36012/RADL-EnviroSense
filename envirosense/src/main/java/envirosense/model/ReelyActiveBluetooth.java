package envirosense.model;


import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "ra_bluetooth")
@IdClass(value = envirosense.model.SensorDataPK.class)
public final class ReelyActiveBluetooth implements Serializable {
	@Transient
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "sensor_id")
	private long sensorId;

	@Id
	Timestamp timestamp;

	private String ownerEmail;

	public ReelyActiveBluetooth(long sensorId, String ownerEmail, Timestamp timestamp) {
		this.sensorId = sensorId;
		this.ownerEmail = ownerEmail;
		this.timestamp = timestamp;
	}

	protected ReelyActiveBluetooth() {
	}

	public long getSensorId() {
		return sensorId;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public String getData() {
		return ownerEmail;
	}

	public void setSensorId(long sensorId) {
		this.sensorId = sensorId;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public void setData(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}
}