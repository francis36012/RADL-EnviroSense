package envirosense.controller.api;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.Room;
import envirosense.service.RoomService;

@RestController
@RequestMapping("/api/room")
public class RoomApiController {
	@Autowired
	RoomService roomService;
	
	/**
	 * Retrieves and returns all rooms in the system
	 * @return All rooms and an HTTP status code
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Room>> getAllRooms() {
		List<Room> rooms = roomService.findAll();
		
		if (rooms.isEmpty()) {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}
	
	/**
	 * Retrieves and returns the room with the specified ID
	 * @param id The ID of the room to retrieve
	 * @return The retrieved room and an HTTP status code
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Room> getOne(@PathVariable("id") long id) {
		Room room = roomService.findOne(id);
		
		if (room == null) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(room, HttpStatus.OK);
	}
}