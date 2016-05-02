package envirosense.model;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "motion")
@IdClass(envirosense.model.SensorDataPK.class)
public class Motion implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "sensor_id")
	private long sensorId;

	@Id
	// TODO: Extract these settings into a configurations file
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", timezone = "America/Edmonton")
	private Timestamp timestamp;

	private boolean data;

	public Motion(long sensorId, Timestamp timestamp, boolean data) {
		this.sensorId = sensorId;
		this.timestamp = timestamp;
		this.data = data;
	}

	public Motion() {
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

	public void setSensorId(long sensorId) {
		this.sensorId = sensorId;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	public void setData(boolean data) {
		this.data = data;
	}
}