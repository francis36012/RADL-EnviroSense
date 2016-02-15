package envirosense.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "econdition")
public class Condition implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private long id;
	
	@ManyToOne(targetEntity = Sensor.class)
	@JoinColumn(name = "sensor_id")
	private Sensor sensor;
	
	private String value;
	
	private String modifier;
	
	@Column(name = "date_time")
	private Date dateTime;

	@Column(name = "weekly_occurrences")
	private boolean weeklyOccurrences[] = new boolean[7];

	public Condition(long id, Sensor sensor, String value, String modifier, Date dateTime,
			boolean[] weeklyOccurrences) {
		super();
		this.id = id;
		this.sensor = sensor;
		this.value = value;
		this.modifier = modifier;
		this.dateTime = dateTime;
		this.weeklyOccurrences = weeklyOccurrences;
	}
	
	public Condition() {
	}

	public long getId() {
		return id;
	}

	public Sensor getSensor() {
		return sensor;
	}

	public String getValue() {
		return value;
	}

	public String getModifier() {
		return modifier;
	}

	public Date getDateTime() {
		return dateTime;
	}

	public boolean[] getWeeklyOccurrences() {
		return weeklyOccurrences;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setSensor(Sensor sensor) {
		this.sensor = sensor;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	public void setWeeklyOccurrences(boolean[] weeklyOccurrences) {
		this.weeklyOccurrences = weeklyOccurrences;
	}
}