package envirosense.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import envirosense.model.BluetoothBeacon;

/**
 * Repository interface for getting bluetooth beacon information
 */
public interface BluetoothBeaconRepository extends JpaRepository<BluetoothBeacon, String> {

	/**
	 * Returns all beacons owned by the specified user
	 * @param user The user whose beacons are to be retrieved
	 * @return Beacons owned by the specified user
	 */
	List<BluetoothBeacon> findByUser(String user);
}
