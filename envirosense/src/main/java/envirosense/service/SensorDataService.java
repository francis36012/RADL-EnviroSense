package envirosense.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.repository.HumidityRepository;
import envirosense.repository.TemperatureRepository;

@Service
public class SensorDataService {

	@Autowired
	TemperatureRepository temperatureRepository;
	
	@Autowired
	HumidityRepository humidityRepository;
}