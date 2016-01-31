package envirosense.service;


import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import envirosense.model.Sensor;
import envirosense.model.SensorType;
import envirosense.repository.SensorRepsitory;

/**
 * @author Francis Agyapong
 */
@Service
public class SensorApiService
{
	@Autowired
	SensorRepsitory sensorRepository;

	public List<Sensor> findAll()
	{
		return sensorRepository.findAll();
	}

	public List<Sensor> findByType(String type)
	{
		return sensorRepository.findBySensorType(SensorType.valueOf(type));
	}

	public Sensor findOne(long id)
	{
		return sensorRepository.findOne(id);
	}
}