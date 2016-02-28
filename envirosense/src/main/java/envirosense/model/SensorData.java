package envirosense.model;


import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * This interface specifies the basic behavior expected from sensor data classes 
 * @author Francis Agyapong 
 */
public class SensorData {
	
	private long id;
	private Object data;
	private SensorType type;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "America/Edmonton")
	private Timestamp timestamp;

	public SensorData(long id, Object data, Timestamp timestamp, SensorType type) {
		this.id = id;
		this.data = data;
		this.timestamp = timestamp;
		this.type = type;
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
		return id;
	}
	
	/**
	 * Returns the sensor type of the sensor that read the data
	 * @return The sensor type of the sensor that read the data
	 */
	public SensorType getSensorType() {
		return type; 
	}
}