package envirosense.repository;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.Humidity;
import envirosense.model.SensorDataPK;

@Repository
public interface HumidityRepository extends JpaRepository<Humidity, SensorDataPK> {
	List<Humidity> findByTimestampBetween(Timestamp start, Timestamp end);
}