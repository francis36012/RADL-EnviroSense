package envirosense.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import envirosense.model.BluetoothBeacon;

public interface BluetoothBeaconRepository extends JpaRepository<BluetoothBeacon, String> {
	List<BluetoothBeacon> findByUser(String user);
}
