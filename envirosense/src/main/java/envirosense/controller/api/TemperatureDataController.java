package envirosense.controller.api;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.Temperature;
import envirosense.service.TemperatureService;

/**
 * A REST controller for mapping requests for temperature data.
 * @author Francis Agyapong
 */
@RestController
public class TemperatureDataController {

	@Autowired
	TemperatureService temperatureDataService;

	@RequestMapping(value = "/api/data/temperature", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Temperature>> allTemperatureData() {
		return new ResponseEntity<>(temperatureDataService.getAll(), HttpStatus.OK);
	}
	
	/**
	 * End-point for getting temperature data for a specific room with a time a range.
	 * Time stamp format is: yyyy-mm-dd hh:mm:ss.fff
	 */
	@RequestMapping(value = "/api/data/temperature/{roomId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Temperature>> byRoomBetween(@PathVariable("roomId") long roomId,
		@RequestParam("start") Timestamp start, @RequestParam("end") Timestamp end) {
		return new ResponseEntity<>(temperatureDataService.getByRoomIdBetween(roomId, start, end), HttpStatus.OK);
	}
}