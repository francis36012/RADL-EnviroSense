package envirosense.repository;


import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import envirosense.model.ReelyActiveBluetooth;
import envirosense.model.SensorDataPK;

public interface RaBluetoothRepository extends JpaRepository<ReelyActiveBluetooth, SensorDataPK> {
	/**
	 * Retrieves and returns all presence data that was recorded between the specified time range
	 * @param start The earliest date and time for the data to be retrieved
	 * @param end The latest date and time for the data to be retrieved
	 * @return A list containing data retrieved
	 */
	List<ReelyActiveBluetooth> findByTimestampBetween(Timestamp start, Timestamp end);

	/**
	 * Retrieves all presence data that was read from the specified room with the specified time range.
	 * 
	 * @param roomId The room in which the data was read
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of presence data that satisfy the conditions explained above.
	 */
	@Query(value = "SELECT * FROM ra_bluetooth ra JOIN sensor s ON s.id = ra.sensor_id "
			+ "JOIN room r ON s.room_id = r.id " + "WHERE (r.id = ?1) AND "
			+ "(ra.timestamp >= ?2 AND ra.timestamp <= ?3)", nativeQuery = true)
	List<ReelyActiveBluetooth> findByRoomIdAndTimestampBetween(long roomId, Timestamp start, Timestamp end);

	/**
	 * Retrieves all presence data that was read by the specified sensor in the specified time range
	 * 
	 * @param sensorId The ID of the sensor that read the data being retrieved
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of presence data that satisfy the conditions explained above.
	 */
	List<ReelyActiveBluetooth> findBySensorIdAndTimestampBetween(long sensorId, Timestamp start, Timestamp end);

	/**
	 * Retrieves all presence data that was read by the sensor with the ID specified
	 * 
	 * @param sensorId The ID of the sensor that read the data to be returned
	 * @return A list of presence data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM ra_bluetooth ra JOIN sensor s ON s.id = ra.sensor_id WHERE s.id = ?1", nativeQuery = true)
	List<ReelyActiveBluetooth> findBySensorId(long sensorId);

	/**
	 * Retrieves all presence data that was read in the room with the ID specified
	 * 
	 * @param sensorId The ID of the room in which the data was read
	 * @return A list of presence data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM ra_bluetooth ra JOIN sensor s ON s.id = ra.sensor_id WHERE s.room_id = ?1", nativeQuery = true)
	List<ReelyActiveBluetooth> findByRoomId(long roomId);


	/**
	 * Retrieves the latest presence data from the room the specified ID.
	 * @param roomId The ID of the room in which the data was read
	 * @return A List of presence data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT * FROM ra_bluetooth ra JOIN sensor s ON ra.sensor_id = s.id WHERE s.room_id = ?1 ORDER BY timestamp DESC LIMIT 1;",
		nativeQuery = true
	)
	List<ReelyActiveBluetooth> findLatestByRoomId(long roomId);

	/**
	 * Retrieves the latest presence data stored in the database.
	 * @return A List of presence data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT sensor_id, data, timestamp AS timestamp FROM ra_bluetooth WHERE sensor_id = ?1 ORDER BY timestamp LIMIT 1",
		nativeQuery = true
	)
	List<ReelyActiveBluetooth> findLatestBySensorId(long sensorId);
	
	/**
	 * Retrieves the latest presence data stored in the database.
	 * @return A List of presence data that satisfy the conditions given above.
	 */
	@Query(
		value = "SELECT * FROM ra_bluetooth WHERE (sensor_id, timestamp) IN (SELECT sensor_id, timestamp FROM ra_bluetooth GROUP BY sensor_id HAVING MAX(timestamp))",
		nativeQuery = true
	)
	List<ReelyActiveBluetooth> findLatest();
}