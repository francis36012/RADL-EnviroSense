package envirosense.model;


import java.io.Serializable;
import java.sql.Timestamp;

/**
 * This class is the <code>IdClass</code> for all sensor data classes
 * 
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
	 * 
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int)(sensorId ^ (sensorId >>> 32));
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
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
		SensorDataPK other = (SensorDataPK)obj;
		if (sensorId != other.sensorId)
			return false;
		if (timestamp == null) {
			if (other.timestamp != null)
				return false;
		} else if (!timestamp.equals(other.timestamp))
			return false;
		return true;
	}
}