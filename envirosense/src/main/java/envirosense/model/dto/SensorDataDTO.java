package envirosense.model.dto;


import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import envirosense.model.SensorType;

/**
 * This class models a sensor data type 
 * @author Francis Agyapong 
 */
public class SensorDataDTO {
	
	private long sensorId;
	private String roomName;
	private String roomDescription;
	private Object data;
	private SensorType sensorType;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "America/Edmonton")
	private Timestamp timestamp;

	public SensorDataDTO(long id, String roomName, String roomDescription, Object data, Timestamp timestamp, SensorType type) {
		this.sensorId = id;
		this.roomName = roomName;
		this.roomDescription = roomDescription;
		this.data = data;
		this.timestamp = timestamp;
		this.sensorType = type;
	}
	
	public SensorDataDTO() {
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
	 * Returns the name of the room in which this data was read
	 * @return The name of the room in which this data was read
	 */
	public String getRoomName() {
		return roomName;
	}
	
	/**
	 * Returns the description of the room in which this data was read
	 * @return The description of the room in which this data was read
	 */
	public String getRoomDescription() {
		return roomDescription;
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
	 * 
	 * @param roomName
	 */
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	
	/**
	 * 
	 * @param roomDescription
	 */
	public void setRoomDescription(String roomDescription) {
		this.roomDescription = roomDescription;
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