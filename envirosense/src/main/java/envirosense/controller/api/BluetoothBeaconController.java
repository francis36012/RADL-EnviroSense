package envirosense.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import envirosense.model.BluetoothBeacon;
import envirosense.repository.BluetoothBeaconRepository;

@RestController
@RequestMapping("/api/beacon")
public class BluetoothBeaconController {
	
	@Autowired
	BluetoothBeaconRepository beaconRepository;
	
	/**
	 * Returns all beacons in the database
	 * @return All beacons in the database
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public ResponseEntity<List<BluetoothBeacon>> all() {
		List<BluetoothBeacon> beacons = beaconRepository.findAll();
		
		if (beacons.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(beacons, HttpStatus.OK);
	}
	
	/**
	 * Returns the beacon with the specified ID
	 * @param id The ID of the beacon to return
	 * @return The beacon with the specified ID
	 */
	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public ResponseEntity<BluetoothBeacon> findById(@PathVariable("id") long id) {
		BluetoothBeacon beacon = beaconRepository.findOne(id);
		
		if (beacon == null) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(beacon, HttpStatus.OK);
	}

	/**
	 * Returns all the beacons whose owner has the email specified
	 * @param email The email of the user who owns the beacons to be returned
	 * @return All the beacons whose owner has the email specified
	 */
	@RequestMapping(value = "/id/{email}", method = RequestMethod.GET)
	public ResponseEntity<List<BluetoothBeacon>> findByUser(@PathVariable("email") String email) {
		List<BluetoothBeacon> beacons = beaconRepository.findByUser(email);
		
		if (beacons.isEmpty()) {
			return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(beacons, HttpStatus.OK);
	}
}