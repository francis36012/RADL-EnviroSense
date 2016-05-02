package envirosense.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Sensor;
import envirosense.model.SensorType;
import envirosense.repository.SensorRepsitory;

@Service
public class SensorService {
	@Autowired
	SensorRepsitory sensorRepository;

	/**
	 * Returns all sensors in the database
	 * @return All sensors in the database
	 */
	public List<Sensor> findAll() {
		return sensorRepository.findAll();
	}

	/**
	 * Returns all sensors of the type specified
	 * @param type The sensor type to search for
	 * @return All sensors of the type specified
	 */
	public List<Sensor> findByType(String type) {
		return sensorRepository.findBySensorType(SensorType.valueOf(type));
	}

	/**
	 * Returns the sensor with the specified ID
	 * @param id The ID of the sensor to return
	 * @return The sensor with the specified ID
	 */
	public Sensor findOne(long id) {
		return sensorRepository.findOne(id);
	}
}