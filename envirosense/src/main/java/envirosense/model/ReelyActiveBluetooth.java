package envirosense.model;


import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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

	@ManyToOne(targetEntity = BluetoothBeacon.class)
	@JoinColumn(name = "beacon_id")
	private BluetoothBeacon beacon;
	
	@Column(name = "rssi")
	private int rssi;

	public ReelyActiveBluetooth(long sensorId, Timestamp timestamp, BluetoothBeacon beacon, int rssi) {
		this.sensorId = sensorId;
		this.timestamp = timestamp;
		this.beacon = beacon;
		this.rssi = rssi;
	}

	protected ReelyActiveBluetooth() {
	}

	public long getSensorId() {
		return sensorId;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public BluetoothBeacon getBeacon() {
		return beacon;
	}
	
	public int getRssi() {
		return rssi;
	}

	public void setSensorId(long sensorId) {
		this.sensorId = sensorId;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public void setBeacon(BluetoothBeacon beacon) {
		this.beacon = beacon;
	}
	
	public void setRssi(int rssi){
		this.rssi = rssi;
	}
}