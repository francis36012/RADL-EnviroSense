package envirosense.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import envirosense.model.Room;
import envirosense.repository.RoomRepository;

@Service
public class RoomService {

	@Autowired
	RoomRepository roomRepository;
	
	public Room save(Room room) {
		return roomRepository.save(room);
	}
	
	public void delete(long id) {
		Room room = roomRepository.findOne(id);
		if (room != null) {
			roomRepository.delete(room);
		}
	}
	
	public List<Room> findAll() {
		return roomRepository.findAll();
	}
	
	public Room findOne(long id) {
		return roomRepository.findOne(id);
	}
}