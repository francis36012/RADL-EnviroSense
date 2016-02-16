package envirosense.service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Door;
import envirosense.model.Humidity;
import envirosense.model.Motion;
import envirosense.model.SensorData;
import envirosense.model.SensorType;
import envirosense.model.Temperature;
import envirosense.repository.DoorRepository;
import envirosense.repository.HumidityRepository;
import envirosense.repository.MotionRepository;
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
	@Autowired
	DoorRepository doorRepository;

	/** TODO: Documentation */
	@Autowired
	MotionRepository motionRepository;

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
		// TODO: complete implementation
		switch (sensorType) {
			case TE:
				return mapTemperatureData(temperatureRepository.findAll());
			case HU:
				return mapHumidityData(humidityRepository.findAll());
			case DR:
				return mapDoorData(doorRepository.findAll());
			case MO:
				return mapMotionData(motionRepository.findAll());
			case PA:
				// TODO
				return new ArrayList<>();
			case RA:
				// TODO
			case UK:
				return new ArrayList<>();
			default:
				return new ArrayList<>();
		}
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param roomId
	 * @return
	 */
	public List<SensorData> findLastestByRoomId(long roomId) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorId
	 * @return
	 */
	public List<SensorData> findLatestBySensorId(long sensorId) {
		// TODO: implementation
		return null;
	}

	/**
	 * TODO: Documentation
	 * 
	 * @param sensorType
	 * @return
	 */
	public List<SensorData> findLatestBySensorType(SensorType sensorType) {
		// TODO: complete implementation
		switch (sensorType) {
			case TE:
				return mapTemperatureData(temperatureRepository.findAll());
			case HU:
				return mapHumidityData(humidityRepository.findAll());
			case DR:
				return mapDoorData(doorRepository.findAll());
			case MO:
				return mapMotionData(motionRepository.findAll());
			case PA:
				// TODO
				return new ArrayList<>();
			case RA:
				// TODO
			case UK:
				return new ArrayList<>();
			default:
				return new ArrayList<>();
		}
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
		// TODO: complete implementation
		switch (sensorType) {
			case TE:
				return mapTemperatureData(temperatureRepository.findAll());
			case HU:
				return mapHumidityData(humidityRepository.findAll());
			case DR:
				return mapDoorData(doorRepository.findAll());
			case MO:
				return mapMotionData(motionRepository.findAll());
			case PA:
				// TODO
				return new ArrayList<>();
			case RA:
				// TODO
			case UK:
				return new ArrayList<>();
			default:
				return new ArrayList<>();
		}
	}
	
	// TODO: Documentation
	/**
	 * Retrieves data read by sensors of the type specified in the room with the ID specified
	 * @param roomId
	 * @param sensorType
	 * @param startTime
	 * @param endTime
	 * @return
	 */
	public List<SensorData> findByRoomIdSensorTypeAndTimestamp(long roomId, SensorType sensorType,
			Timestamp startTime, Timestamp endTime) {
		switch (sensorType) {
			case TE:
				return mapTemperatureData(temperatureRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime));
			case HU:
				return mapHumidityData(humidityRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime));
			case DR:
				return mapDoorData(doorRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime));
			case MO:
				return mapMotionData(motionRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime));
			case PA:
				// TODO
				return new ArrayList<>();
			case RA:
				// TODO
			case UK:
				return new ArrayList<>();
			default:
				return new ArrayList<>();
		}
	}
	
	private List<SensorData> mapTemperatureData(List<Temperature> data) {
		List<SensorData> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			mapped.add(d);
		});
		return mapped;
	}

	private List<SensorData> mapHumidityData(List<Humidity> data) {
		List<SensorData> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			mapped.add(d);
		});
		return mapped;
	}

	private List<SensorData> mapDoorData(List<Door> data) {
		List<SensorData> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			mapped.add(d);
		});
		return mapped;
	}

	private List<SensorData> mapMotionData(List<Motion> data) {
		List<SensorData> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			mapped.add(d);
		});
		return mapped;
	}
}