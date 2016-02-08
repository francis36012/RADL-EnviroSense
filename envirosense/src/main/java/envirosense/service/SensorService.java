package envirosense.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Sensor;
import envirosense.model.SensorType;
import envirosense.repository.SensorRepsitory;

/**
 * @author Francis Agyapong
 */
@Service
public class SensorService {
	@Autowired
	SensorRepsitory sensorRepository;

	public List<Sensor> findAll() {
		return sensorRepository.findAll();
	}

	public List<Sensor> findByType(String type) {
		return sensorRepository.findBySensorType(SensorType.valueOf(type));
	}

	public Sensor findOne(long id) {
		return sensorRepository.findOne(id);
	}
}