package envirosense.repository;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import envirosense.model.Humidity;
import envirosense.model.SensorDataPK;

@Repository
public interface HumidityRepository extends JpaRepository<Humidity, SensorDataPK> {
	/**
	 * Retrieves and returns all humidity data that was recorded between the specified time range
	 * @param start The earliest date and time for the data to be retrieved
	 * @param end The latest date and time for the data to be retrieved
	 * @return A list containing data retrieved
	 */
	List<Humidity> findByTimestampBetween(Timestamp start, Timestamp end);
}