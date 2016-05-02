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
	
	/**
	 * Saves the specified room back into the database
	 * @param room The room to save
	 * @return The saved room
	 */
	public Room save(Room room) {
		return roomRepository.save(room);
	}
	
	/**
	 * Deletes the room with specified ID
	 * @param id The ID of the room to delete
	 */
	public void delete(long id) {
		Room room = roomRepository.findOne(id);
		if (room != null) {
			roomRepository.delete(room);
		}
	}
	
	/**
	 * Retrieves and returns all rooms stored in the system
	 * @return All rooms stored in the system
	 */
	public List<Room> findAll() {
		return roomRepository.findAll();
	}
	
	/**
	 * Retrieves and returns the room with specified ID
	 * @param id The ID of the room to retrieve
	 * @return The retrieved room
	 */
	public Room findOne(long id) {
		return roomRepository.findOne(id);
	}
}