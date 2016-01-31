package envirosense.model;


public enum SensorType
{
	TM("Temperature"), HU("Humidity"), DR("Door"), MO("Motion"), PA("Particle"), RA(
			"ReelyActive"), UK("UNKNOWN");

	String sensorType;

	private SensorType(String sensorType)
	{
		this.sensorType = sensorType;
	}

	public String getSensorType()
	{
		return sensorType;
	}
}
