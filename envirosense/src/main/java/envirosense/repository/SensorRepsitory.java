package envirosense.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import envirosense.model.Sensor;
import envirosense.model.SensorType;
import org.springframework.stereotype.Repository;

/**
 * @author Francis Agyapong
 */
@Repository
public interface SensorRepsitory extends JpaRepository<Sensor, Long>
{
	List<Sensor> findBySensorType(SensorType type);
}