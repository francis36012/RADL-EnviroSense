package envirosense.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import envirosense.model.BluetoothBeacon;

public interface BluetoothBeaconRepository extends JpaRepository<BluetoothBeacon, Long> {
}
