package envirosense.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import envirosense.model.ReelyActiveBluetooth;
import envirosense.model.SensorDataPK;

public interface RaBluetoothRepository extends JpaRepository<ReelyActiveBluetooth, SensorDataPK> {
}