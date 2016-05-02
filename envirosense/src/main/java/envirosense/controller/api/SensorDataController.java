package envirosense.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.SensorType;
import envirosense.model.dto.SensorDataDTO;
import envirosense.service.EventHandler;
import envirosense.service.SensorDataService;

@RestController
@RequestMapping("/api/data")
public class SensorDataController {
	
	@Autowired
	SensorDataService dataService;
	
	@Autowired
	EventHandler eventHandler;

	/**
	 * @param data The body of this request (must be a list of sensor data)
	 * @param result The result of binding the request body to the parameter type
	 * @return ResponseEntity with HTTP status of the request
	 */
	@RequestMapping( value = "/new", method = RequestMethod.POST,
		consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<String> newData(@RequestBody List<SensorDataDTO> data, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		eventHandler.run(data);
		dataService.save(data);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	/**
	 * Controller for retrieving data read from sensors in the specified room
	 * @param roomId The ID of the room the information from
	 * @return A ResponseEntity containing the retrieved data and an HTTP status code
	 */
	@RequestMapping(
		value = "/live/room/{roomId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<List<SensorDataDTO>> getLatestByRoom(@PathVariable("roomId") long roomId) {
		List<SensorDataDTO> data = dataService.findLastestByRoomId(roomId);
		
		if (data.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	/**
	 * Controller for retrieving data read from sensors of the specified type
	 * @param sensorType The type of the sensor
	 * @return Data read by sensors with the specified type
	 */
	@RequestMapping(value = "/live/sensortype/{sensorType}", method = RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<List<SensorDataDTO>> getLatestBySensorType(@PathVariable("sensorType") SensorType sensorType) {
		List<SensorDataDTO> data = dataService.findLatestBySensorType(sensorType);
		
		if (data.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(data, HttpStatus.OK);
	}
}