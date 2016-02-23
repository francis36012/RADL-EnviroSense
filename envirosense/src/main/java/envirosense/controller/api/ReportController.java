package envirosense.controller.api;

import envirosense.model.SensorData;
import envirosense.model.SensorType;
import envirosense.service.SensorDataService;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controllers for generating reports from the sensor data in the database
 *
 * @author Daniel Chau
 */
@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    SensorDataService sensorDataService;

    /**
     * REST Controller to return a dataset of all sensor data in a given room
     * for the given time/date range
     *
     * @param roomId The ID of the room
     * @param startDate The start date of the data to return
     * @param endDate The end date of the data to return
     * @return A list of SensorData objects for all sensors in the specified
     * room for the given time/date range
     */
    @RequestMapping(
            value = "/room/{roomId}/{startDate}/{endDate}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SensorData>> getDataByRoomId(
            @PathVariable("roomId") long roomId,
            @PathVariable("startDate") Timestamp startDate,
            @PathVariable("endDate") Timestamp endDate) {
        List<SensorData> sensorData = sensorDataService.findByRoomIdAndTimestampBetween(roomId, startDate, endDate);
        if (sensorData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sensorData, HttpStatus.OK);
    }

    /**
     * REST Controller to return a dataset of all sensor data of a given sensor
     * type for the given time/date range in all rooms
     *
     * @param sensorType The sensor type to retrieve data from
     * @param startDate the start date of the data to return
     * @param endDate the end date of the data to return
     * @return A list of SensorData objects for all sensors of the specified
     * type in all rooms for the given time/date range
     */
    @RequestMapping(
            value = "/type/{sensorType}/{startDate}/{endDate}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SensorData>> getDataBySensorType(
            @PathVariable("sensorType") SensorType sensorType,
            @PathVariable("startDate") Timestamp startDate,
            @PathVariable("endDate") Timestamp endDate) {
        List<SensorData> sensorData = sensorDataService.findBySensorTypeAndTimestampBetween(sensorType, startDate, endDate);
        if (sensorData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sensorData, HttpStatus.OK);
    }

    /**
     * REST Controller to return a dataset of sensor data from one specified
     * sensor for the given time/date range
     *
     * @param sensorId The particular sensor to return data from
     * @param startDate the start date of the data to return
     * @param endDate the end date of the data to return
     * @return A list of SensorData objects for the given sensor for the given
     * time/date range
     */
    @RequestMapping(
            value = "/sensorId/{sensorId}/{startDate}/{endDate}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SensorData>> getDataBySensorId(
            @PathVariable("sensorId") long sensorId,
            @PathVariable("startDate") Timestamp startDate,
            @PathVariable("endDate") Timestamp endDate) {
        List<SensorData> sensorData = sensorDataService.findBySensorIdAndTimestampBetween(sensorId, startDate, endDate);
        if (sensorData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sensorData, HttpStatus.OK);
    }

    
    /**
     * REST Controller to return a dataset of the specified sensorType data in a given room
     * for the given time/date range
     *
     * @param roomId The ID of the room
     * @param sensorType The sensorType to retrieve data from
     * @param startDate The start date of the data to return
     * @param endDate The end date of the data to return
     * @return A list of SensorData objects for the specified sensor type in the specified
     * room for the given time/date range
     */
    @RequestMapping(
            value = "/{roomId}/{sensorType}/{startDate}/{endDate}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SensorData>> getDataBySensorTypeAndRoomId(
            @PathVariable("roomId") long roomId,
            @PathVariable("sensorType") SensorType sensorType,
            @PathVariable("startDate") Timestamp startDate,
            @PathVariable("endDate") Timestamp endDate) {
        List<SensorData> sensorData = sensorDataService.findByRoomIdSensorTypeAndTimestamp(roomId, sensorType, startDate, endDate);
        if (sensorData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sensorData, HttpStatus.OK);
    }
}
