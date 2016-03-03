package envirosense.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.Calendar;

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

	/**
	 * This method takes an object that holds some sensor data and a calendar object, evaluates this
	 * condition with the provided arguments and returns a boolean.
	 * 
	 * @param data The sensor data to compare with this condition's value.
	 * @param calendar The date that the data specified was read
	 * @return <code>true</code> If a comparison of the data and the date (and time) matched,
	 * <code>false</code> if otherwise.
	 */
	public boolean evaluate(Object data, Calendar calendar) {
		
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
			
			if (!timeEqual(calendar)) {
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

			if (!timeEqual(calendar)) {
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

	/**
	 * Takes an integer representing the day of the week returned from Calendar.get and compares
	 * it with the day of the week in this condition's date.
	 * @param dayOfWeek The day of the week to check
	 * @return <code>true</code> If the specified integer represents the day of the week in this condition's
	 * date, <code>false</code> if otherwise.
	 */
	private boolean dayInCondition(int dayOfWeek) {
		switch (dayOfWeek) {
			case Calendar.SUNDAY:
				return weeklyOccurrences[0];
			case Calendar.MONDAY:
				return weeklyOccurrences[1];
			case Calendar.TUESDAY:
				return weeklyOccurrences[2];
			case Calendar.WEDNESDAY:
				return weeklyOccurrences[3];
			case Calendar.THURSDAY:
				return weeklyOccurrences[4];
			case Calendar.FRIDAY:
				return weeklyOccurrences[5];
			case Calendar.SATURDAY:
				return weeklyOccurrences[6];
			default:
				return false;
		}
	}
	
	/**
	 * Takes a calendar object and checks to see if it's greater than or equal to this condition's
	 * date, and if the hour and the minute of both times match.
	 * @param now The calendar object that is to be compared to this condition's date
	 * @return <code>true</code> if the condition described holds, <code>false</code> if otherwise.
	 */
	private boolean timeEqual(Calendar now) {
		Calendar conditionTime = Calendar.getInstance();
		conditionTime.setTime(dateTime);
		
		int currentDay = now.get(Calendar.DAY_OF_WEEK);
		
		if (now.compareTo(conditionTime) >= 0) {
			if ((now.get(Calendar.HOUR_OF_DAY) == conditionTime.get(Calendar.HOUR_OF_DAY)) &&
			    (now.get(Calendar.MINUTE) == conditionTime.get(Calendar.MINUTE)) &&
			    (dayInCondition(currentDay))) {
				return true;
			}
		}
		return false;
	}
}