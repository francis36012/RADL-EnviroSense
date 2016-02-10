package envirosense.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.Humidity;
import envirosense.service.HumidityService;

/**
 * A REST controller for mapping requests for humidity data.
 * 
 * @author Francis Agyapong
 */
@RestController
public class HumidityDataController {

	@Autowired
	HumidityService humidityDataService;

	@RequestMapping(value = "/api/data/humidity", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Humidity>> allTemperatureData() {
		return new ResponseEntity<>(humidityDataService.getAll(), HttpStatus.OK);
	}
}