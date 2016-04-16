package envirosense.service;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.BluetoothBeacon;
import envirosense.model.Door;
import envirosense.model.Humidity;
import envirosense.model.Motion;
import envirosense.model.ReelyActiveBluetooth;
import envirosense.model.Room;
import envirosense.model.Sensor;
import envirosense.model.SensorType;
import envirosense.model.Temperature;
import envirosense.model.dto.BluetoothDataDTO;
import envirosense.model.dto.SensorDataDTO;
import envirosense.repository.DoorRepository;
import envirosense.repository.HumidityRepository;
import envirosense.repository.MotionRepository;
import envirosense.repository.RaBluetoothRepository;
import envirosense.repository.RoomRepository;
import envirosense.repository.SensorRepsitory;
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
	
	@Autowired
	RoomRepository roomRepository;
	
	@Autowired
	SensorRepsitory sensorRepository;
	
	@Autowired
	RaBluetoothRepository raRepository;
	
	// This is to speed up room lookup when fetching data. Not the best solution
	// A better solution will be to restructure the data classes to allow hibernate to optimize
	// the queries
	private Map<Long, Room> roomInfoCache = new HashMap<>();

	/**
	 * Retrieves all data read in the room with the specified ID
	 * @param roomId The ID of the room in which the data to be retrieved was read
	 * @return Data read in the room with the specified ID
	 */
	public List<SensorDataDTO> findByRoomId(long roomId) {
		List<SensorDataDTO> results = new ArrayList<>();
		
		results.addAll(mapTemperatureData(temperatureRepository.findByRoomId(roomId)));
		results.addAll(mapHumidityData(humidityRepository.findByRoomId(roomId)));
		results.addAll(mapDoorData(doorRepository.findByRoomId(roomId)));
		results.addAll(mapMotionData(motionRepository.findByRoomId(roomId)));
		results.addAll(mapRABleData(raRepository.findByRoomId(roomId)));

		return results;
	}

	/**
	 * Retrieves all data read by the sensor with specified ID
	 * 
	 * @param sensorId The ID of the sensor that read the data to be retrieved
	 * @return A list of sensor data read by the sensor with the specified ID
	 */
	public List<SensorDataDTO> findBySensorId(long sensorId) {
		// Find the sensor
		Sensor sensor = sensorService.findOne(sensorId);


		if (sensor == null) {
			return new ArrayList<>();
		}
		switch (sensor.getSensorType()) {
			case TE:
				return mapTemperatureData(temperatureRepository.findBySensorId(sensorId));
			case HU:
				return mapHumidityData(humidityRepository.findBySensorId(sensorId));
			case DR:
				return mapDoorData(doorRepository.findBySensorId(sensorId));
			case MO:
				return mapMotionData(motionRepository.findBySensorId(sensorId));
			case PA:
				// TODO
				return new ArrayList<>();
			case RA:
				return mapRABleData(raRepository.findBySensorId(sensorId));
			case UK:
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
	public List<SensorDataDTO> findBySensorType(SensorType sensorType) {
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
				return mapRABleData(raRepository.findAll());
			case UK:
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
	public List<SensorDataDTO> findLastestByRoomId(long roomId) {
		List<SensorDataDTO> results = new ArrayList<>();
		
		results.addAll(mapTemperatureData(temperatureRepository.findLatestByRoomId(roomId)));
		results.addAll(mapHumidityData(humidityRepository.findLatestByRoomId(roomId)));
		results.addAll(mapDoorData(doorRepository.findLatestByRoomId(roomId)));
		results.addAll(mapMotionData(motionRepository.findLatestByRoomId(roomId)));
		results.addAll(mapRABleData(raRepository.findLatestByRoomId(roomId)));

		return results;
	}

	/**
	 * Retrieves the latest data read from the sensor with the ID specified 
	 * 
	 * @param sensorId The ID sensor whose latest data is to be retrieved
	 * @return The latest data read from the sensor with the ID specified
	 */
	public List<SensorDataDTO> findLatestBySensorId(long sensorId) {
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
				return mapRABleData(raRepository.findLatestBySensorId(sensorId));
			case TE:
				return mapTemperatureData(temperatureRepository.findLatestBySensorId(sensorId));
			case UK:
			default:
				return new ArrayList<>();
		}
	}

	/**
	 * Retrieves the latest data read by sensors with specified type in all rooms
	 * @param sensorType The type of the sensor whose latest data is to be retrieved
	 * @return The latest data read by sensors with specified type in all rooms
	 */
	public List<SensorDataDTO> findLatestBySensorType(SensorType sensorType) {
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
				return mapRABleData(raRepository.findLatest());
			case UK:
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
	public List<SensorDataDTO> findByRoomIdAndTimestampBetween(long roomId, Timestamp startTime, Timestamp endTime) {
		List<SensorDataDTO> result = new ArrayList<>();

		result.addAll(mapTemperatureData(temperatureRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime)));
		result.addAll(mapHumidityData(humidityRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime)));
		result.addAll(mapDoorData(doorRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime)));
		result.addAll(mapMotionData(motionRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime)));
		result.addAll(mapRABleData(raRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime)));

		return result;
	}

	/**
	 * Retrieves data read by the sensor with specified ID within the specified time range
	 * 
	 * @param sensorId The ID of the sensor that read the data to be retrieved
	 * @param startTime The time and date to start checking (inclusive)
	 * @param endtime The time and date to end checking (inclusive)
	 * @return A list of sensor data that meet the criteria described above
	 */
	public List<SensorDataDTO> findBySensorIdAndTimestampBetween(long sensorId, Timestamp startTime, Timestamp endtime) {
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
				return mapRABleData(raRepository.findLatestBySensorId(sensorId));
			case TE:
				return mapTemperatureData(temperatureRepository.findLatestBySensorId(sensorId));
			case UK:
			default:
				return new ArrayList<>();
		}
	}

	/**
	 * Retrieves all sensor data from all sensors with type specified that was read between the specified time range
	 * 
	 * @param sensorType The type of the sensor
	 * @param startTime The time and date to start checking (inclusive)
	 * @param endTime The time and date to end checking (inclusive)
	 * @return A list of sensor data that satisfy the conditions outlined above.
	 */
	public List<SensorDataDTO> findBySensorTypeAndTimestampBetween(SensorType sensorType, Timestamp startTime, Timestamp endTime) {
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
				return mapRABleData(raRepository.findByTimestampBetween(startTime, endTime));
			case UK:
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
	public List<SensorDataDTO> findByRoomIdSensorTypeAndTimestamp(long roomId, SensorType sensorType, Timestamp startTime, Timestamp endTime) {
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
				return mapRABleData(raRepository.findByRoomIdAndTimestampBetween(roomId, startTime, endTime));
			case UK:
			default:
				return new ArrayList<>();
		}
	}
	
	/**
	 * Saves sensor data contained in the data parameter
	 * 
	 * @param data The data to be saved.
	 */
	public void save(List<SensorDataDTO> data) {
		List<Temperature> temperatureData = new ArrayList<>();
		List<Humidity> humidityData = new ArrayList<>();
		List<Door> doorData = new ArrayList<>();
		List<Motion> motionData = new ArrayList<>();
		List<ReelyActiveBluetooth> raData = new ArrayList<>();

		for (SensorDataDTO d : data) {
			switch (d.getSensorType()) {
				case DR:
					try {
						int ddata = Integer.parseInt(d.getData().toString());
						if (ddata > 0) {
							doorData.add(new Door(d.getSensorId(), d.getTimestamp(), true));
						} else {
							doorData.add(new Door(d.getSensorId(), d.getTimestamp(), false));
						}
					} catch (Exception ex) {
					}
					break;
				case HU:
					try {
						double ddata = Double.parseDouble(d.getData().toString());
						humidityData.add(new Humidity(d.getSensorId(), d.getTimestamp(), ddata));
					} catch (Exception ex) {
					}
					break;
				case MO:
					try {
						int ddata = Integer.parseInt(d.getData().toString());
						if (ddata > 0) {
							motionData.add(new Motion(d.getSensorId(), d.getTimestamp(), true));
						} else {
							motionData.add(new Motion(d.getSensorId(), d.getTimestamp(), false));
						}
					} catch (Exception ex) {
					}
					break;
				case PA:
					break;
				case RA:
					try {
						@SuppressWarnings("unchecked")
						LinkedHashMap<String, Object> bleInfoMap = (LinkedHashMap<String, Object>)d.getData();
						BluetoothDataDTO bleInfo = new BluetoothDataDTO(
								(Integer)bleInfoMap.get("rssi"),
								(String)bleInfoMap.get("beaconId"),
								(String)bleInfoMap.get("userEmail"));
						BluetoothBeacon beacon = new BluetoothBeacon(bleInfo.getBeaconId(), bleInfo.getUserEmail());
						raData.add(new ReelyActiveBluetooth(d.getSensorId(), d.getTimestamp(), beacon, bleInfo.getRssi()));
					} catch (Exception ex) {
						ex.getMessage();
						// We are good programmers, its just that this is a pain in the .......
						// Error inferring comments
					}
					break;
				case TE:
					try {
						double ddata = Double.parseDouble(d.getData().toString());
						temperatureData.add(new Temperature(d.getSensorId(), d.getTimestamp(), ddata));
					} catch (Exception ex) {
					}
					break;
				case UK:
				default:
					break;
			}
		}
		temperatureRepository.save(temperatureData);
		humidityRepository.save(humidityData);
		doorRepository.save(doorData);
		motionRepository.save(motionData);
		raRepository.save(raData);
	}
	
	/**
	 * Maps a list of temperature data to a list of SensorDataDTO
	 * @param data The temperature data to map
	 * @return A list of SensorDataDTO
	 */
	private List<SensorDataDTO> mapTemperatureData(List<Temperature> data) {
		List<SensorDataDTO> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			String[] roomInfo = getRoomInfo(d.getSensorId());
			if (roomInfo.length == 2) {
				mapped.add(new SensorDataDTO(
						d.getSensorId(),
						roomInfo[0],
						roomInfo[1],
						d.getData(),
						d.getTimestamp(),
						SensorType.TE));
			}
		});
		return mapped;
	}

	/**
	 * Maps a list of humidity data to a list of SensorDataDTO
	 * @param data The humidity data to map
	 * @return A list of SensorDataDTO
	 */
	private List<SensorDataDTO> mapHumidityData(List<Humidity> data) {
		List<SensorDataDTO> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			String[] roomInfo = getRoomInfo(d.getSensorId());
			if (roomInfo.length == 2) {
				mapped.add(new SensorDataDTO(
						d.getSensorId(),
						roomInfo[0],
						roomInfo[1],
						d.getData(),
						d.getTimestamp(),
						SensorType.HU));
			}
		});
		return mapped;
	}

	/**
	 * Maps a list of door data to a list of SensorDataDTO
	 * @param data The door data to map
	 * @return A list of SensorDataDTO
	 */
	private List<SensorDataDTO> mapDoorData(List<Door> data) {
		List<SensorDataDTO> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			String[] roomInfo = getRoomInfo(d.getSensorId());
			if (roomInfo.length == 2) {
				mapped.add(new SensorDataDTO(
						d.getSensorId(),
						roomInfo[0],
						roomInfo[1],
						d.getData(),
						d.getTimestamp(),
						SensorType.DR));
			}
		});
		return mapped;
	}

	/**
	 * Maps a list of motion data to a list of SensorDataDTO
	 * @param data The motion data to map
	 * @return A list of SensorDataDTO
	 */
	private List<SensorDataDTO> mapMotionData(List<Motion> data) {
		List<SensorDataDTO> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			String[] roomInfo = getRoomInfo(d.getSensorId());
			if (roomInfo.length == 2) {
				mapped.add(new SensorDataDTO(
						d.getSensorId(),
						roomInfo[0],
						roomInfo[1],
						d.getData(),
						d.getTimestamp(),
						SensorType.MO));
			}
		});
		return mapped;
	}

	/**
	 * Maps a list of ReelyActive data to a list of SensorDataDTO
	 * @param data The ReelyActive data to map
	 * @return A list of SensorDataDTO
	 */
	private List<SensorDataDTO> mapRABleData(List<ReelyActiveBluetooth> data) {
		List<SensorDataDTO> mapped = new ArrayList<>();
		data.stream().forEach((d) -> {
			String[] roomInfo = getRoomInfo(d.getSensorId());
			if (roomInfo.length == 2) {
				mapped.add(new SensorDataDTO(d.getSensorId(),
						roomInfo[0],
						roomInfo[1],
						new BluetoothDataDTO(d.getRssi(), d.getBeacon().getId(), d.getBeacon().getUser()),
						d.getTimestamp(),
						SensorType.RA));
			}
		});
		return mapped;
	}
	
	/**
	 * Returns the name and description of the room in which the sensor with specified ID is located
	 * @param sensorId The sensor whose room information is to be retrieved.
	 * @return A two element array for the name and description of the room if found, or empty if not.
	 */
	private String[] getRoomInfo(long sensorId)  {
		Room room;

		room = roomInfoCache.get(sensorId);
		if (room != null) {
			return new String[]{room.getName(), room.getDescription()};
		}

		Sensor sensor = sensorRepository.findOne(sensorId);
		if (sensor == null) {
			return new String[]{};
		}
		room = sensor.getRoom();

		roomInfoCache.put(sensorId, room);
		return new String[]{room.getName(), room.getDescription()};
	}
}