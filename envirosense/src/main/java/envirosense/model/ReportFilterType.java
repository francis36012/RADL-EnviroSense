package envirosense.model;


/**
 * A ReportFilterType determines what type of data will be used to filter data to be retrieved for a report.
 * 
 * @author Francis Agyapong
 */
public enum ReportFilterType {
	/** Filter data based on a room ID */
	Room,

	/** Filter data based on a specific sensor */
	Sensor,

	/** Filter data based on a specific sensor type */
	SensorType,
}