package envirosense.service;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.SensorData;
import envirosense.model.SensorType;
import envirosense.repository.HumidityRepository;
import envirosense.repository.TemperatureRepository;

@Service
public class SensorDataService {

	/** TODO: Documentation */
	@Autowired
	TemperatureRepository temperatureRepository;

	/** TODO: Documentation */
	@Autowired
	HumidityRepository humidityRepository;

	/** TODO: Documentation */
	public List<SensorData> findByRoomId(long roomId) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorId
	 * @return
	 */
	public List<SensorData> findBySensorId(long sensorId) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorType
	 * @return
	 */
	public List<SensorData> findBySensorType(SensorType sensorType) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param roomId
	 * @return
	 */
	public List<SensorData> findFirst5ByRoomId(long roomId) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorId
	 * @return
	 */
	public List<SensorData> findFirst5BySensorId(long sensorId) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorType
	 * @return
	 */
	public List<SensorData> findFirst5BySensorType(SensorType sensorType) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param roomId
	 * @param startTime
	 * @param endtime
	 * @return
	 */
	public List<SensorData> findByRoomIdAndTimestampBetween(long roomId, Timestamp startTime,
			Timestamp endtime) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorId
	 * @param startTime
	 * @param endtime
	 * @return
	 */
	public List<SensorData> findBySensorIdAndTimestampBetween(long sensorId, Timestamp startTime,
			Timestamp endtime) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorType
	 * @param startTime
	 * @param endtime
	 * @return
	 */
	public List<SensorData> findBySensorTypeAndTimestampBetween(SensorType sensorType,
			Timestamp startTime, Timestamp endtime) {
		// TODO: implementation
		return null;
	}
}