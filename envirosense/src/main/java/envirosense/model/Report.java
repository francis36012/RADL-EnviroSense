package envirosense.model;


import java.sql.Timestamp;
import java.util.List;

import envirosense.model.dto.SensorDataDTO;

public class Report {
	/** The name of the report */
	private final String name;

	/** The dataset that makes up this report */
	private final List<SensorDataDTO> dataSet;

	/** The earliest timestamp for the retrieved data set */
	private final Timestamp starttime;

	/** The earliest latest for the retrieved data set */
	private final Timestamp endtime;

	/** The type data in this report */
	private final ReportFilterType filterType;

	/** The filter value for this report */
	private final Object filterValue;

	/**
	 * Creates a new Report object using the specified arguments
	 * 
	 * @param name The name of the report
	 * @param dataSet The dataset that makes up this report
	 * @param startDate The earliest timestamp for the retrieved data set
	 * @param endDate The latest timestamp for the retrieved data set
	 * @param filterType The type data in this report
	 * @param filterValue The filter value for this report
	 */
	public Report(String name, List<SensorDataDTO> dataSet, Timestamp startDate, Timestamp endDate,
			ReportFilterType filterType, Object filterValue) {
		this.name = name;
		this.dataSet = dataSet;
		this.starttime = startDate;
		this.endtime = endDate;
		this.filterType = filterType;
		this.filterValue = filterValue;
	}

	/**
	 * Returns the name of this report
	 * 
	 * @return The name of this report
	 */
	public String getName() {
		return name;
	}

	/**
	 * Returns the dataset that makes up this report
	 * 
	 * @return The dataset that makes up this report
	 */
	public List<SensorDataDTO> getDataSet() {
		return dataSet;
	}

	/**
	 * Returns the earliest time for data in this report
	 * 
	 * @return The earliest time for data in this report
	 */
	public Timestamp getStartTime() {
		return starttime;
	}

	/**
	 * Returns the latest time for data in this report
	 * 
	 * @return The latest time for data in this report
	 */
	public Timestamp getEndTime() {
		return endtime;
	}

	public ReportFilterType getFilterType() {
		return filterType;
	}

	public Object getFilterValue() {
		return filterValue;
	}
}