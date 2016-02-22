package envirosense.model;

import java.sql.Timestamp;

public class SensorDataRequest {
	private long sensorId;
	private Timestamp timestamp;
	private Object data;
	private SensorType sensorType;

	
	public SensorDataRequest(long sensorId, Timestamp timestamp, Object data, SensorType sensorType) {
		super();
		this.sensorId = sensorId;
		this.timestamp = timestamp;
		this.data = data;
		this.sensorType = sensorType;
	}
	
	public SensorDataRequest() {
	}

	public long getSensorId() {
		return sensorId;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public Object getData() {
		return data;
	}
	
	public SensorType getSensorType() {
		return sensorType;
	}

	public void setSensorId(long sensorId) {
		this.sensorId = sensorId;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public void setData(Object data) {
		this.data = data;
	}
	
	public void setSensorType(SensorType sensorType) {
		this.sensorType = sensorType;
	}
}