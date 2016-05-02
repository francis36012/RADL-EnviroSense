package envirosense.model;


import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * ConditionTime holds the date and time for which a condition becomes valid. It also holds the days
 * in the week that the condition must be evaluated. There is also a boolean flag that specifies whether
 * a condition must be evaluated every time from the time it becomes valid. The validity of the ConditionTime
 * depends on the modifier.
 * 
 * @see envirosense.model.ConditionModifier
 */
@Entity
@Table(name = "condition_time")
public class ConditionTime implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	private boolean sunday;
	private boolean monday;
	private boolean tuesday;
	private boolean wednesday;
	private boolean thursday;
	private boolean friday;
	private boolean saturday;
	
	@Column(name = "date_time")
	private Timestamp dateTime;
	
	@Column(name = "all_hours")
	private boolean allHours;
	
	@Column(name = "time_check")
	@Enumerated(EnumType.STRING)
	private ConditionModifier timeCheck;
	
	/**
	 * Creates a new condition time using the specified parameters
	 * @param sunday Sunday check
	 * @param monday Monday check
	 * @param tuesday Tuesday check
	 * @param wednesday Wednesday check
	 * @param thursday Thursday check
	 * @param friday Friday check
	 * @param saturday Saturday check
	 * @param dateTime When to check
	 * @param allHours Check at all hours
	 * @param timeCheck Time modifier
	 */
	public ConditionTime(
		boolean sunday,
		boolean monday,
		boolean tuesday,
		boolean wednesday,
		boolean thursday,
		boolean friday,
		boolean saturday,
		Timestamp dateTime,
		boolean allHours,
		ConditionModifier timeCheck
	) {
		this.sunday = sunday;
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
		
		this.dateTime = dateTime;
		this.allHours = allHours;
		this.timeCheck = timeCheck;
	}
	
	public ConditionTime() {
	}

	public long getId() {
		return id;
	}

	public boolean isSunday() {
		return sunday;
	}

	public boolean isMonday() {
		return monday;
	}

	public boolean isTuesday() {
		return tuesday;
	}

	public boolean isWednesday() {
		return wednesday;
	}

	public boolean isThursday() {
		return thursday;
	}

	public boolean isFriday() {
		return friday;
	}

	public boolean isSaturday() {
		return saturday;
	}

	public Timestamp getDateTime() {
		return dateTime;
	}

	public boolean isAllHours() {
		return allHours;
	}

	public ConditionModifier getTimeCheck() {
		return timeCheck;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setSunday(boolean sunday) {
		this.sunday = sunday;
	}

	public void setMonday(boolean monday) {
		this.monday = monday;
	}

	public void setTuesday(boolean tuesday) {
		this.tuesday = tuesday;
	}

	public void setWednesday(boolean wednesday) {
		this.wednesday = wednesday;
	}

	public void setThursday(boolean thursday) {
		this.thursday = thursday;
	}

	public void setFriday(boolean friday) {
		this.friday = friday;
	}

	public void setSaturday(boolean saturday) {
		this.saturday = saturday;
	}

	public void setDateTime(Timestamp dateTime) {
		this.dateTime = dateTime;
	}

	public void setAllHours(boolean allHours) {
		this.allHours = allHours;
	}

	public void setTimeCheck(ConditionModifier timeCheck) {
		this.timeCheck = timeCheck;
	}
	
	@Override
	public String toString() {
		if (allHours) {
			return "";
		}
		return String.format("%s %s", timeCheck.getModifierSymbol(), dateTime.toString());
	}
}