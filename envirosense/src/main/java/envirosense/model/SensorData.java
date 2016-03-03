package envirosense.model;


import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * This interface specifies the basic behavior expected from sensor data classes 
 * @author Francis Agyapong 
 */
public class SensorData {
	
	private long sensorId;
	private Object data;
	private SensorType sensorType;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "America/Edmonton")
	private Timestamp timestamp;

	public SensorData(long id, Object data, Timestamp timestamp, SensorType type) {
		this.sensorId = id;
		this.data = data;
		this.timestamp = timestamp;
		this.sensorType = type;
	}
	
	public SensorData() {
	}
	
	/**
	 * Returns the data contained in a SensorData object
	 * @return The data contained in a SensorData object
	 */
	public Object getData() {
		return data;
	}

	/**
	 * Returns the date and time that data was read in a SensorData object
	 * @return the date and time that data was read in a SensorData object
	 */
	public Timestamp getTimestamp() {
		return timestamp;
	}

	/**
	 * Returns the ID of the sensor that read the data
	 * @return The ID of the sensor that read the data
	 */
	public long getSensorId() {
		return sensorId;
	}
	
	/**
	 * Returns the sensor type of the sensor that read the data
	 * @return The sensor type of the sensor that read the data
	 */
	public SensorType getSensorType() {
		return sensorType; 
	}

	/**
	 * Sets the ID of the sensor that read the data
	 * @param sensorId The ID of the sensor that read the data
	 */
	public void setSensorId(long sensorId) {
		this.sensorId = sensorId;
	}

	/**
	 * Sets the data that was read
	 * @param data The data that was read
	 */
	public void setData(Object data) {
		this.data = data;
	}

	/**
	 * Sets the type of sensor that read the data
	 * @param sensorType The type of sensor that read the data
	 */
	public void setSensorType(SensorType sensorType) {
		this.sensorType = sensorType;
	}

	/**
	 * Sets the timestamp for when the data was read
	 * @param timestamp The time and date when the data was read
	 */
	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}
}