package envirosense.repository;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import envirosense.model.SensorDataPK;
import envirosense.model.Temperature;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, SensorDataPK> {

	/**
	 * Retrieves all temperature data that was read between the specified timestamps
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of temperature data that satify the conditions outlined above.
	 */
	List<Temperature> findByTimestampBetween(Timestamp start, Timestamp end);
	
	/**
	 * Retrieves all temperature data that was read from the specified room with the specified time range.
	 * <br/>
	 * <b>NOTE:</b> Try converting the query into a spring data JPA query.
	 * 
	 * @param roomId The room in which the data was read
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of temperature that satisfies the conditions explained above.
	 */
	@Query(value ="SELECT * FROM temperature t JOIN sensor s ON s.id = t.sensor_id "
			+ "JOIN room r ON s.room_id = r.id "
			+ "WHERE (r.id = ?1) AND "
			+ "(t.timestamp >= ?2 AND t.timestamp <= ?3)",
			nativeQuery = true)
	List<Temperature> findByRoomIdAndTimestampBetween(long roomId, Timestamp start, Timestamp end);
}