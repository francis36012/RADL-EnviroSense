package envirosense.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Temperature;
import envirosense.repository.TemperatureRepository;

@Service
public class TemperatureService {
	
	@Autowired
	TemperatureRepository dataRepository;
	
	public List<Temperature> getAll() {
		return dataRepository.findAll();
	}
	
	public List<Temperature> getByRoomIdBetween(long roomId, Timestamp start, Timestamp end) {
		return dataRepository.findByRoomIdAndTimestampBetween(roomId, start, end);
	}
}