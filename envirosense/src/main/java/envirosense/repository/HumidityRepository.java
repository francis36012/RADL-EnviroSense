package envirosense.repository;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

	/**
	 * Retrieves all humidity data that was read from the specified room with the specified time range.
	 * <br/>
	 * <b>NOTE:</b> Try converting the query into a spring data JPA query.
	 * 
	 * @param roomId The room in which the data was read
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of humidity data that satisfy the conditions explained above.
	 */
	@Query(value = "SELECT * FROM humidity h JOIN sensor s ON s.id = h.sensor_id "
			+ "JOIN room r ON s.room_id = r.id " + "WHERE (r.id = ?1) AND "
			+ "(h.timestamp >= ?2 AND h.timestamp <= ?3)", nativeQuery = true)
	List<Humidity> findByRoomIdAndTimestampBetween(long roomId, Timestamp start, Timestamp end);

	// TODO: Try converting the query into a spring data JPA query.
	/**
	 * Retrieves all humidity data that was read by the sensor with the ID specified
	 * 
	 * @param sensorId The ID of the sensor that read the data to be returned
	 * @return A list of humidity data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM humidity h JOIN sensor s ON s.id = h.sensor_id WHERE s.id = ?1", nativeQuery = true)
	List<Humidity> findBySensorId(long sensorId);

	/**
	 * Retrieves the latest humidity data from the room the specified ID.
	 * @param roomId The ID of the room in which the data was read
	 * @return A List of humidity data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT * FROM humidity h JOIN sensor s ON h.sensor_id = s.id WHERE s.room_id = ?1 ORDER BY timestamp DESC LIMIT 1;",
		nativeQuery = true
	)
	List<Humidity> findLatestByRoomId(long roomId);
	
	/**
	 * Retrieves the latest humidity data stored in the database.
	 * @return A List of humidity data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT * FROM humidity h WHERE timestamp >= (SELECT max(timestamp) from humidity);",
		nativeQuery = true
	)
	List<Humidity> findLatest();
}