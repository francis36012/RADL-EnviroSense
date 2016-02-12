package envirosense.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import envirosense.model.Motion;
import envirosense.model.SensorDataPK;

@Repository
public interface MotionRepository extends JpaRepository<Motion, SensorDataPK> {

	/**
	 * Retrieves all motion data that was read between the specified timestamps
	 * 
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of motion data that satisfy the conditions outlined above.
	 */
	List<Motion> findByTimestampBetween(Timestamp start, Timestamp end);

	/**
	 * Retrieves all motion data that was read from the specified room with the specified time range.
	 * <br/>
	 * <b>NOTE:</b> Try converting the query into a spring data JPA query.
	 * 
	 * @param roomId The room in which the data was read
	 * @param start The time and date to start checking (inclusive)
	 * @param end The time and date to end checking (inclusive)
	 * @return A list of motion data that satisfy the conditions explained above.
	 */
	@Query(value = "SELECT * FROM motion m JOIN sensor s ON s.id = m.sensor_id "
			+ "JOIN room r ON s.room_id = r.id " + "WHERE (r.id = ?1) AND "
			+ "(m.timestamp >= ?2 AND m.timestamp <= ?3)", nativeQuery = true)
	List<Motion> findByRoomIdAndTimestampBetween(long roomId, Timestamp start, Timestamp end);

	// TODO: Try converting the query into a spring data JPA query.
	/**
	 * Retrieves all motion data that was read by the sensor with the ID specified
	 * 
	 * @param sensorId The ID of the sensor that read the data to be returned
	 * @return A list of motion data that satisfy the conditions outlined above
	 */
	@Query(value = "SELECT * FROM motion m JOIN sensor s ON s.id = m.sensor_id WHERE s.id = ?1", nativeQuery = true)
	List<Motion> findBySensorId(long sensorId);
}