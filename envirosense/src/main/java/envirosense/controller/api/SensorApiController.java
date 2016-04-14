package envirosense.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.Sensor;
import envirosense.service.SensorService;

@RestController
@RequestMapping("/api/sensor")
public class SensorApiController {
	@Autowired
	SensorService sensorService;

	/**
	 * Retrieves and returns all sensors in the system
	 * @return All sensors and an HTTP status code
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Sensor>> allSensors() {
		List<Sensor> sensors = sensorService.findAll();
		if (sensors.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(sensors, HttpStatus.OK);
	}

	/**
	 * Retrieves and returns the sensor with specified ID
	 * @param id The ID of the sensor to retrieve
	 * @return Retrieved sensor and an HTTP status code
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Sensor> sensor(@PathVariable("id") long id) {
		Sensor sensor = sensorService.findOne(id);
		if (sensor == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(sensor, HttpStatus.OK);
	}

	/**
	 * Retrieves and returns the sensor with specified type
	 * @param type The type of the sensor to retrieve
	 * @return Retrieved sensor and an HTTP status code
	 */
	@RequestMapping(value = "/type/{type}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Sensor>> sensor(@PathVariable("type") String type) {
		List<Sensor> sensors = sensorService.findByType(type);
		if (sensors.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(sensors, HttpStatus.OK);
	}
}