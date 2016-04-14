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
	 * 
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of temperature data that satify the conditions outlined above.
	 */
	List<Temperature> findByTimestampBetween(Timestamp start, Timestamp end);

	/**
	 * Retrieves all temperature data that was read from the specified room with the specified time range.
	 * 
	 * @param roomId The room in which the data was read
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of temperature that satisfies the conditions explained above.
	 */
	@Query(value = "SELECT * FROM temperature t JOIN sensor s ON s.id = t.sensor_id "
			+ "JOIN room r ON s.room_id = r.id " + "WHERE (r.id = ?1) AND "
			+ "(t.timestamp >= ?2 AND t.timestamp <= ?3)", nativeQuery = true)
	List<Temperature> findByRoomIdAndTimestampBetween(long roomId, Timestamp start, Timestamp end);

	/**
	 * Retrieves all temperature data that was read by the specified sensor in the specified time range
	 * 
	 * @param sensorId The ID of the sensor that read the data being retrieved
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of temperature data that satisfy the conditions explained above.
	 */
	List<Temperature> findBySensorIdAndTimestampBetween(long sensorId, Timestamp start, Timestamp end);

	/**
	 * Retrieves all temperature data that was read by the sensor with the ID specified
	 * 
	 * @param sensorId The ID of the sensor that read the data to be returned
	 * @return A list of temperature data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM temperature t JOIN sensor s ON s.id = t.sensor_id WHERE s.id = ?1", nativeQuery = true)
	List<Temperature> findBySensorId(long sensorId);

	/**
	 * Retrieves all temperature data that was read in the room with the ID specified
	 * 
	 * @param roomId The ID of the room in which the data was read
	 * @return A list of temperature data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM temperature t JOIN sensor s ON s.id = t.sensor_id WHERE s.room_id = ?1", nativeQuery = true)
	List<Temperature> findByRoomId(long roomId);

	/**
	 * Retrieves the latest temperature data from the room the specified ID.
	 * @param roomId The ID of the room in which the data was read
	 * @return A List of temperature data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT * FROM temperature t JOIN sensor s ON t.sensor_id = s.id WHERE s.room_id = ?1 ORDER BY timestamp DESC LIMIT 1",
		nativeQuery = true
	)
	List<Temperature> findLatestByRoomId(long roomId);

	/**
	 * Retrieves the latest temperature data stored in the database.
	 * @param sensorId The ID of the room in which the data was read
	 * @return A List of temperature data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT sensor_id, data, timestamp FROM temperature WHERE sensor_id = ?1 ORDER BY timestamp DESC LIMIT 1",
		nativeQuery = true
	)
	List<Temperature> findLatestBySensorId(long sensorId);
	
	/**
	 * Retrieves the latest temperature data stored in the database.
	 * @return A List of temperature data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT sensor_id, data, timestamp FROM temperature WHERE (sensor_id, timestamp) IN (select sensor_id, MAX(timestamp) FROM temperature GROUP BY sensor_id)",
		nativeQuery = true
	)
	List<Temperature> findLatest();
}