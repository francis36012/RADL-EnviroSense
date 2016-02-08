package envirosense.model;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * This class is the <code>IdClass</code> for all sensor data classes 
 * @author Francis Agyapong
 */
public class SensorDataPK implements Serializable {
	private static final long serialVersionUID = 1L;

	/* The ID of the sensor that sent the data */
	private long sensorId;
	
	/* The time and date when the data was sent */
	private Timestamp timestamp;

	
	/**
	 * Creates a new SensorData object using the specified arguments
	 * @param sensorId The ID of the sensor data to be created
	 * @param timestamp The time and date of the sensor data to be created
	 */
	public SensorDataPK(long sensorId, Timestamp timestamp) {
		this.sensorId = sensorId;
		this.timestamp = timestamp;
	}
	
	public SensorDataPK() {
	}

	public long getSensorId() {
		return sensorId;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public void setSensorId(long sensorId) {
		this.sensorId = sensorId;
	}
}