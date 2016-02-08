package envirosense.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.Sensor;
import envirosense.model.SensorType;

/**
 * @author Francis Agyapong
 */
@Repository
public interface SensorRepsitory extends JpaRepository<Sensor, Long> {
	List<Sensor> findBySensorType(SensorType type);
}