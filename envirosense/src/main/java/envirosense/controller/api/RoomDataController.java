/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package envirosense.controller.api;

import envirosense.model.SensorData;
import envirosense.service.SensorService;
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
 *
 * @author Daniel
 */
@RestController
@RequestMapping("/api/room")
public class RoomDataController {
/*
    @Autowired
    SensorService sensorService;

    @RequestMapping(
            value = "/{id}/{startDate}/{endDate}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SensorData>> getDataByRoom(@PathVariable("id") int id, @PathVariable("startDate") String startDate,
            @PathVariable("endDate") String endDate) {
        List<SensorData> sensorData = sensorService.findByRoom(id, startDate, endDate);
        if (sensorData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sensorData, HttpStatus.OK);
    }

    @RequestMapping (
            value = "/{sensorType}/{startDate}/{endDate}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SensorData>> getDataByType
        (@PathVariable("sensorType") String sensorType, @PathVariable("startDate") String startDate,
            @PathVariable("endDate") String endDate) {
            List<SensorData> sensorData = sensorService.findByType(sensorType, startDate, endDate);
            if(sensorData.isEmpty())
            {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(sensorData, HttpStatus.OK);
        }

*/
}
