package envirosense.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import envirosense.model.Door;
import envirosense.model.SensorDataPK;

@Repository
public interface DoorRepository extends JpaRepository<Door, SensorDataPK> {

	/**
	 * Retrieves all door data that was read between the specified timestamps
	 * 
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of door data that satisfy the conditions outlined above.
	 */
	List<Door> findByTimestampBetween(Timestamp start, Timestamp end);

	/**
	 * Retrieves all door data that was read from the specified room with the specified time range.
	 * 
	 * @param roomId The room in which the data was read
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of door data that satisfy the conditions explained above.
	 */
	@Query(value = "SELECT * FROM door d JOIN sensor s ON s.id = d.sensor_id "
			+ "JOIN room r ON s.room_id = r.id " + "WHERE (r.id = ?1) AND "
			+ "(d.timestamp >= ?2 AND d.timestamp <= ?3)", nativeQuery = true)
	List<Door> findByRoomIdAndTimestampBetween(long roomId, Timestamp start, Timestamp end);
	
	/**
	 * Retrieves all door data that was read by the specified sensor in the specified time range
	 * 
	 * @param sensorId The ID of the sensor that read the data being retrieved
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of door data that satisfy the conditions explained above.
	 */
	List<Door> findBySensorIdAndTimestampBetween(long sensorId, Timestamp start, Timestamp end);

	/**
	 * Retrieves all door data that was read by the sensor with the ID specified
	 * 
	 * @param sensorId The ID of the sensor that read the data to be returned
	 * @return A list of door data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM door d JOIN sensor s ON s.id = d.sensor_id WHERE s.id = ?1", nativeQuery = true)
	List<Door> findBySensorId(long sensorId);

	/**
	 * Retrieves all motion data that was read in the room with the ID specified
	 * 
	 * @param sensorId The ID of the room in which the data was read
	 * @return A list of motion data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM door d JOIN sensor s ON s.id = d.sensor_id WHERE s.room_id = ?1", nativeQuery = true)
	List<Door> findByRoomId(long roomId);

	/**
	 * Retrieves the latest door data from the room the specified ID.
	 * @param roomId The ID of the room in which the data was read
	 * @return A List of door data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT * FROM door d JOIN sensor s ON d.sensor_id = s.id WHERE s.room_id = ?1 ORDER BY timestamp DESC LIMIT 1;",
		nativeQuery = true
	)
	List<Door> findLatestByRoomId(long roomId);

	/**
	 * Retrieves the latest door data stored in the database.
	 * @return A List of door data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT sensor_id, data, timestamp AS timestamp FROM door WHERE sensor_id = ?1 ORDER BY timestamp LIMIT 1",
		nativeQuery = true
	)
	List<Door> findLatestBySensorId(long sensorId);
	
	/**
	 * Retrieves the latest door data from all rooms stored in the database.
	 * @return A List of door data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT sensor_id, data, timestamp FROM door d JOIN sensor s ON d.sensor_id = s.id GROUP BY s.room_id ORDER BY timestamp LIMIT 1",
		nativeQuery = true
	)
	List<Door> findLatest();
}