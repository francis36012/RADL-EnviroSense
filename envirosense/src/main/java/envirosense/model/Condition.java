package envirosense.model;

import java.io.Serializable;
import java.util.Calendar;

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
	
	@ManyToOne(targetEntity = ConditionTime.class)
	@JoinColumn(name = "condition_time_id")
	private ConditionTime conditionTime;

	public Condition(long id, Sensor sensor, String value, ConditionModifier modifier, ConditionTime conditionTime) {
		super();
		this.id = id;
		this.sensor = sensor;
		this.value = value;
		this.modifier = modifier;
		this.conditionTime = conditionTime;
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

	public ConditionTime getConditionTime() {
		return conditionTime;
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

	public void setWeeklyOccurrences(ConditionTime conditionTime) {
		this.conditionTime = conditionTime;
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
				incomingData = (Integer)data == 1 ? true : false; 
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
				return conditionTime.isSunday();
			case Calendar.MONDAY:
				return conditionTime.isMonday();
			case Calendar.TUESDAY:
				return conditionTime.isTuesday();
			case Calendar.WEDNESDAY:
				return conditionTime.isWednesday();
			case Calendar.THURSDAY:
				return conditionTime.isThursday();
			case Calendar.FRIDAY:
				return conditionTime.isFriday();
			case Calendar.SATURDAY:
				return conditionTime.isSaturday();
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
		Calendar cTime = Calendar.getInstance();
		cTime.setTime(conditionTime.getDateTime());
		
		int currentDay = now.get(Calendar.DAY_OF_WEEK);
		
		if (now.compareTo(cTime) >= 0 && dayInCondition(currentDay)) {
			if (conditionTime.isAllHours()) {
				return true;
			}
			switch (conditionTime.getTimeCheck()) {
				case EQ:
					if ((now.get(Calendar.HOUR_OF_DAY) == cTime.get(Calendar.HOUR_OF_DAY)) &&
						(now.get(Calendar.MINUTE) == cTime.get(Calendar.MINUTE))) {
						return true;
					}
					return false;
				case GE:
					if ((now.get(Calendar.HOUR_OF_DAY) >= cTime.get(Calendar.HOUR_OF_DAY)) &&
						(now.get(Calendar.MINUTE) >= cTime.get(Calendar.MINUTE))) {
						return true;
					}
					return false;
				case GT:
					if ((now.get(Calendar.HOUR_OF_DAY) > cTime.get(Calendar.HOUR_OF_DAY)) &&
						(now.get(Calendar.MINUTE) > cTime.get(Calendar.MINUTE))) {
						return true;
					}
					return false;
				case LE:
					if ((now.get(Calendar.HOUR_OF_DAY) <= cTime.get(Calendar.HOUR_OF_DAY)) &&
						(now.get(Calendar.MINUTE) <= cTime.get(Calendar.MINUTE))) {
						return true;
					}
					return false;
				case LT:
					if ((now.get(Calendar.HOUR_OF_DAY) < cTime.get(Calendar.HOUR_OF_DAY)) &&
						(now.get(Calendar.MINUTE) < cTime.get(Calendar.MINUTE))) {
						return true;
					}
					return false;
				case NE:
					if ((now.get(Calendar.HOUR_OF_DAY) != cTime.get(Calendar.HOUR_OF_DAY)) &&
						(now.get(Calendar.MINUTE) != cTime.get(Calendar.MINUTE))) {
						return true;
					}
				default:
					return false;
			}
		}
		return false;
	}
	
	@Override
	public String toString() {
		SensorType sType = sensor.getSensorType();
		
		if (sType == SensorType.TE) {
			double data = Double.parseDouble(value);
			if (conditionTime.isAllHours()) {
				return String.format(
					"temperature in %s is %s %.2f",
					sensor.getRoom().getName(),
					modifier.getModifierSymbol(),
					data
				);
			} else {
				return String.format(
					"temperature in %s is %s %.2f and time %s",
					sensor.getRoom().getName(),
					modifier.getModifierSymbol(),
					data,
					conditionTime.toString()
				);
			}

		} else if (sType == SensorType.HU) {
			double data = Double.parseDouble(value);
			if (conditionTime.isAllHours()) {
				return String.format(
					"humidity in %s is %s %.2f",
					sensor.getRoom().getName(),
					modifier.getModifierSymbol(),
					data,
					conditionTime.toString()
				);
			} else {
				return String.format(
					"humidity in %s is %s %.2f and time %s",
					sensor.getRoom().getName(),
					modifier.getModifierSymbol(),
					data,
					conditionTime.toString()
				);
				
			}
		} else if (sType == SensorType.MO) {
			boolean data = Boolean.parseBoolean(value);
			if (conditionTime.isAllHours()) {
				return String.format(
					"motion %s in %s",
					(data == true) ? "detected" : "not detected",
					sensor.getRoom().getName()
				);
			} else {
				return String.format(
					"motion %s in %s and time %s",
					(data == true) ? "detected" : "not detected",
					sensor.getRoom().getName(),
					conditionTime.toString()
				);
			}
		} else if (sType == SensorType.DR) {
			boolean data = Boolean.parseBoolean(value);
			if (conditionTime.isAllHours()) {
				return String.format(
					"door is %s in %s",
					(data == true) ? "open" : "closed",
					sensor.getRoom().getName(),
					conditionTime.toString()
				);
			} else {
				return String.format(
					"door is %s in %s and time %s",
					(data == true) ? "open" : "closed",
					sensor.getRoom().getName(),
					conditionTime.toString()
				);
			}
		} else if (sType == SensorType.RA) {
		}
		return "";
	}
}