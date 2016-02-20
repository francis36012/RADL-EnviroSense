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

import envirosense.model.SensorData;
import envirosense.model.SensorDataRequest;
import envirosense.model.SensorType;
import envirosense.service.SensorDataService;

@RestController
public class SensorDataController {
	
	@Autowired
	SensorDataService dataService;

	/**
	 * @param data The body of this request (must be a list of sensor data)
	 * @param result The result of binding the request body to the parameter type
	 * @return
	 */
	@RequestMapping( value = "/api/data/new", method = RequestMethod.POST,
		consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<String> newData(@RequestBody List<SensorDataRequest> data, BindingResult result) {
		if (result.hasErrors()) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		dataService.save(data);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	/**
	 * @param roomId
	 * @return
	 */
	@RequestMapping(
		value = "/api/data/live/room/{roomId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<List<SensorData>> getLatestByRoom(@PathVariable("roomId") long roomId) {
		List<SensorData> data = dataService.findLastestByRoomId(roomId);
		
		if (data.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(data, HttpStatus.OK);
	}

	/**
	 * @param sensorType
	 * @return
	 */
	@RequestMapping(value = "/api/data/live/sensortype/{sensorType}", method = RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<List<SensorData>> getLatestBySensorType(@PathVariable("sensorType") SensorType sensorType) {
		List<SensorData> data = dataService.findLatestBySensorType(sensorType);
		
		if (data.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(data, HttpStatus.OK);
	}
}