package envirosense.model;


import java.sql.Timestamp;

/**
 * This interface specifies the basic behavior expected from sensor data classes 
 * @author Francis Agyapong 
 */
public interface SensorData {
	/**
	 * Returns the data contained in a SensorData object
	 * @return The data contained in a SensorData object
	 */
	public Object getData();

	/**
	 * Returns the date and time that data was read in a SensorData object
	 * @return the date and time that data was read in a SensorData object
	 */
	public Timestamp getTimestamp();

	/**
	 * Returns the ID of the sensor that read the data
	 * @return The ID of the sensor that read the data
	 */
	public long getSensorId();
}