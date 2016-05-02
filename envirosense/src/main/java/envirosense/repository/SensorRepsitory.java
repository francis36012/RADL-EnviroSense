package envirosense.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.Sensor;
import envirosense.model.SensorType;

@Repository
public interface SensorRepsitory extends JpaRepository<Sensor, Long> {

	/**
	 * Retrieves and returns all sensors of the specified specified type
	 * @param type The type of the sensors to retrieve
	 * @return The retrieved sensors
	 */
	List<Sensor> findBySensorType(SensorType type);
}