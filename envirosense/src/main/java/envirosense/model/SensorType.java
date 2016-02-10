package envirosense.model;


/**
 * A SensorType describes what type of data a particular sensor reads.
 * @author Francis Agyapong
 */
public enum SensorType {
	/** Temperature sensor */
	TE("Temperature"),
	
	/** Humidity sensor */
	HU("Humidity"),

	/** Door sensor (for detecting opening and closing of doors) */
	DR("Door"),
	
	/** Motion sensor */
	MO("Motion"),
	
	/** Particle or dust sensor */
	PA("Particle"),
	
	/** Indoor tracking sensor */
	RA("ReelyActive"),
	
	/** The sensor type is unknown */
	UK("UNKNOWN");

	String sensorType;

	private SensorType(String sensorType) {
		this.sensorType = sensorType;
	}

	/**
	 * Returns a string representation of the constant
	 * @return A string representation of the constant
	 */
	public String getSensorType() {
		return sensorType;
	}
}