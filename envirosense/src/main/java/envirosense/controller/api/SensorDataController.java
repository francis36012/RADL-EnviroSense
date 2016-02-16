package envirosense.controller.api;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.SensorData;
import envirosense.model.SensorDataRequest;
import envirosense.model.SensorType;

@RestController
public class SensorDataController {
	
	/**
	 * @param data The body of this request (must be a list of sensor data)
	 * @param result The result of binding the request body to the parameter type
	 * @return
	 */
	@Secured({"ROLE_RPI"})
	@RequestMapping(
		value = "/api/data/new",
		method = RequestMethod.POST,
		consumes = MediaType.APPLICATION_JSON_VALUE,
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<String> newData(@RequestBody List<SensorDataRequest> data, BindingResult result) {
		// TODO: Implementation
		if (result.hasErrors()) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
	
	/**
	 * @param roomId
	 * @return
	 */
	@RequestMapping(
		value = "/api/data/live/room/{roomId}",
		method = RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<List<SensorData>> getLatestByRoom(@PathVariable("roomId") long roomId) {
		// TODO: Implementation
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}

	/**
	 * @param sensorType
	 * @return
	 */
	@RequestMapping(
		value = "/api/data/live/sensortype/{sensorType}",
		method = RequestMethod.GET,
		produces = MediaType.APPLICATION_JSON_VALUE
	)
	public ResponseEntity<List<SensorData>> getLatestBySensorType(@PathVariable("sensorType") SensorType sensorType) {
		// TODO: Implementation
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}
}