package envirosense.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
	
	@Enumerated(EnumType.STRING)
	private ConditionModifier modifier;
	
	@Column(name = "date_time")
	private Date dateTime;

	@Column(name = "weekly_occurrences")
	private boolean weeklyOccurrences[] = new boolean[7];

	public Condition(long id, Sensor sensor, String value, ConditionModifier modifier, Date dateTime,
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

	public ConditionModifier getModifier() {
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

	public void setModifier(ConditionModifier modifier) {
		this.modifier = modifier;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	public void setWeeklyOccurrences(boolean[] weeklyOccurrences) {
		this.weeklyOccurrences = weeklyOccurrences;
	}

	// TODO: Refactor this method
	public boolean evaluate(Object data) {
		
		if (data == null) {
			return false;
		}

		SensorType sType = sensor.getSensorType();
		
		if (sType == SensorType.TE || sType == SensorType.HU) {
			double incomingData = 0;
			double conditionData = 0;
			
			try {
				incomingData = (double)data;
				conditionData = Double.parseDouble(value);
				
			} catch (ClassCastException | NumberFormatException ex) {
				return false;
			}

			switch (modifier) {
				case EQ:
					return (incomingData == conditionData);
				case NE:
					return (incomingData != conditionData);
				case GE:
					return (incomingData > conditionData);
				case GT:
					return (incomingData >= conditionData);
				case LT:
					return (incomingData < conditionData);
				case LE:
					return (incomingData <= conditionData);
				default:
					return false;
			}
		} else if ((sType == SensorType.DR) || (sType == SensorType.MO)) {

			boolean incomingData = false;
			boolean conditionData = false;
			
			try {
				incomingData = (boolean)data;
				conditionData = Boolean.parseBoolean(value);
				
			} catch (ClassCastException ex) {
				return false;
			}

			switch (modifier) {
				case EQ:
					return (incomingData == conditionData);
				case NE:
					return (incomingData != conditionData);
				default:
					return false;
			}
		} else if (sType == SensorType.RA) {
			// TODO: Implementation
		} else if (sType == SensorType.PA) {
			// TODO: Implementation
		} else if (sType == SensorType.UK) {
			return false;
		}
		return false;
	}
}