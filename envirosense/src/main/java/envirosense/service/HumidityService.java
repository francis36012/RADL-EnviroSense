package envirosense.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Humidity;
import envirosense.repository.HumidityRepository;

@Service
public class HumidityService {
	
	@Autowired
	HumidityRepository dataRepository;
	
	public List<Humidity> getAll() {
		return dataRepository.findAll();
	}
}