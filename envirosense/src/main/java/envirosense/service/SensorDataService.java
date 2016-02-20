package envirosense.service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Door;
import envirosense.model.Humidity;
import envirosense.model.Motion;
import envirosense.model.Sensor;
import envirosense.model.SensorData;
import envirosense.model.SensorDataRequest;
import envirosense.model.SensorType;
import envirosense.model.Temperature;
import envirosense.repository.DoorRepository;
import envirosense.repository.HumidityRepository;
import envirosense.repository.MotionRepository;
import envirosense.repository.TemperatureRepository;

@Service
public class SensorDataService {

	/** The temperature data repository: Used for retrieving temperature data from the DB*/
	@Autowired
	private TemperatureRepository temperatureRepository;

	/** The humidity data repository: Used for retrieving humidity data from the DB*/
	@Autowired
	private HumidityRepository humidityRepository;
	
	/** The door data repository: Used for retrieving door state data from the DB*/
	@Autowired
	DoorRepository doorRepository;

	/** The motion data repository: Used for retrieving motion data from the DB*/
	@Autowired
	MotionRepository motionRepository;
	
	/** The sensor service: Used for information about sensors from the DB*/
	@Autowired
	SensorService sensorService;

	/**
	 * Retrieves all data read in the room with the specified ID
	 * @param roomId The ID of the room in which the data to be retrieved was read
	 * @return Data read in the room with the specified ID
	 */
	public List<SensorData> findByRoomId(long roomId) {
		// TODO: implementation
		return null;
	}

	/**
	 * Retrieves all data read by the sensor with specified ID
	 * 
	 * @param sensorId The ID of the sensor that read the data to be retrieved
	 * @return A list of sensor data read by the sensor with the specified ID
	 */
	public List<SensorData> findBySensorId(long sensorId) {
		// Find the sensor
		Sensor sensor = sensorService.findOne(sensorId);


		if (sensor == null) {
			return new ArrayList<>();
		}
		switch (sensor.getSensorType()) {
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
	 * Retrieves all data read by the sensors with specified type
	 * 
	 * @param sensorType The type of the sensor that read the data to be retrieved
	 * @return A list of sensor data read by the sensor with the specified type
	 */
	public List<SensorData> findBySensorType(SensorType sensorType) {
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
	 * Retrieves the latest data read by all sensors in the room with the specified ID 
	 * 
	 * @param roomId The ID of the room in which the data to be retrieved was read
	 * @return The latest data read by all sensors in the room with the specified ID
	 */
	public List<SensorData> findLastestByRoomId(long roomId) {
		List<SensorData> results = new ArrayList<>();
		
		results.addAll(temperatureRepository.findLatestByRoomId(roomId));
		results.addAll(humidityRepository.findLatestByRoomId(roomId));
		results.addAll(doorRepository.findLatestByRoomId(roomId));
		results.addAll(motionRepository.findLatestByRoomId(roomId));

		return results;
	}

	/**
	 * Retrieves the latest data read from the sensor with the ID specified 
	 * 
	 * @param sensorId The ID sensor whose latest data is to be retrieved
	 * @return The latest data read from the sensor with the ID specified
	 */
	public List<SensorData> findLatestBySensorId(long sensorId) {
		// Find the sensor
		Sensor sensor = sensorService.findOne(sensorId);


		if (sensor == null) {
			return new ArrayList<>();
		}

		switch (sensor.getSensorType()) {
			case DR:
				return mapDoorData(doorRepository.findLatestBySensorId(sensorId));
			case HU:
				return mapHumidityData(humidityRepository.findLatestBySensorId(sensorId));
			case MO:
				return mapMotionData(motionRepository.findLatestBySensorId(sensorId));
			case PA:
				// TODO
				return new ArrayList<>();
			case RA:
				// TODO
				return new ArrayList<>();
			case TE:
				return mapTemperatureData(temperatureRepository.findLatestBySensorId(sensorId));
			case UK:
				return new ArrayList<>();
			default:
				return new ArrayList<>();
		}
	}

	/**
	 * Retrieves the latest data read by sensors with specified type in all rooms
	 * @param sensorType The type of the sensor whose latest data is to be retrieved
	 * @return The latest data read by sensors with specified type in all rooms
	 */
	public List<SensorData> findLatestBySensorType(SensorType sensorType) {
		switch (sensorType) {
			case TE:
				return mapTemperatureData(temperatureRepository.findLatest());
			case HU:
				return mapHumidityData(humidityRepository.findLatest());
			case DR:
				return mapDoorData(doorRepository.findLatest());
			case MO:
				return mapMotionData(motionRepository.findLatest());
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
	 * Retrieves all sensor data that was read from the specified room within the specified time range.
	 * 
	 * @param roomId The room in which the data was read
	 * @param startTime The time and date to start checking (inclusive)
	 * @param endTime The time and date to end checking (inclusive)
	 * @return A list of sensor data that satisfy the conditions explained above.
	 */
	public List<SensorData> findByRoomIdAndTimestampBetween(long roomId, Timestamp startTime, Timestamp endtime) {
		// TODO: implementation
		return null;
	}

	/**
	 * Retrieves data read by the sensor with specified ID within the specified time range
	 * 
	 * @param sensorId The ID of the sensor that read the data to be retrieved
	 * @param startTime The time and date to start checking (inclusive)
	 * @param endtime The time and date to end checking (inclusive)
	 * @return A list of sensor data that meet the criteria described above
	 */
	public List<SensorData> findBySensorIdAndTimestampBetween(long sensorId, Timestamp startTime, Timestamp endtime) {
		// Find the sensor
		Sensor sensor = sensorService.findOne(sensorId);


		if (sensor == null) {
			return new ArrayList<>();
		}

		switch (sensor.getSensorType()) {
			case DR:
				return mapDoorData(doorRepository.findLatestBySensorId(sensorId));
			case HU:
				return mapHumidityData(humidityRepository.findLatestBySensorId(sensorId));
			case MO:
				return mapMotionData(motionRepository.findLatestBySensorId(sensorId));
			case PA:
				// TODO
				return new ArrayList<>();
			case RA:
				// TODO
				return new ArrayList<>();
			case TE:
				return mapTemperatureData(temperatureRepository.findLatestBySensorId(sensorId));
			case UK:
				return new ArrayList<>();
			default:
				return new ArrayList<>();
		}
	}

	/**
	 * Retrieves all sensor data from all sensors with type specified that was read between the specified time range
	 * 
	 * @param sensorType The type of the sensor
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of sensor data that satisfy the conditions outlined above.
	 */
	public List<SensorData> findBySensorTypeAndTimestampBetween(SensorType sensorType, Timestamp startTime, Timestamp endTime) {
		switch (sensorType) {
			case TE:
				return mapTemperatureData(temperatureRepository.findByTimestampBetween(startTime, endTime));
			case HU:
				return mapHumidityData(humidityRepository.findByTimestampBetween(startTime, endTime));
			case DR:
				return mapDoorData(doorRepository.findByTimestampBetween(startTime, endTime));
			case MO:
				return mapMotionData(motionRepository.findByTimestampBetween(startTime, endTime));
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
	 * Retrieves data read by sensors of the type specified in the room with the ID specified
	 * 
	 * @param roomId The ID of the room in which the data to be retrieved was read
	 * @param sensorType The type of sensors that read the data to be retrieved
	 * @param startTime The time to start checking (inclusive)
	 * @param endTime The time to end checking (inclusive)
	 * @return A list of sensor data matching the criteria explained above
	 */
	public List<SensorData> findByRoomIdSensorTypeAndTimestamp(long roomId, SensorType sensorType, Timestamp startTime, Timestamp endTime) {
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
	
	/**
	 * Saves sensor data contained in the data parameter
	 * 
	 * @param data The data to be saved.
	 */
	public void save(List<SensorDataRequest> data) {
		List<Temperature> temperatureData = new ArrayList<>();
		List<Humidity> humidityData = new ArrayList<>();
		List<Door> doorData = new ArrayList<>();
		List<Motion> motionData = new ArrayList<>();

		for (SensorDataRequest d : data) {
			switch (d.getSensorType()) {
				case DR:
					doorData.add(new Door(d.getSensorId(), d.getTimestamp(), (Boolean)d.getData()));
					break;
				case HU:
					humidityData.add(new Humidity(d.getSensorId(), d.getTimestamp(), (Double)d.getData()));
					break;
				case MO:
					motionData.add(new Motion(d.getSensorId(), d.getTimestamp(), (Boolean)d.getData()));
					break;
				case PA:
					break;
				case RA:
					break;
				case TE:
					temperatureData.add(new Temperature(d.getSensorId(), d.getTimestamp(), (Double)d.getData()));
					break;
				case UK:
					break;
				default:
					break;
			}
		}
		temperatureRepository.save(temperatureData);
		humidityRepository.save(humidityData);
		doorRepository.save(doorData);
		motionRepository.save(motionData);
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