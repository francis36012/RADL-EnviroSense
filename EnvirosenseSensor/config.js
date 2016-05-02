/**
 *                                                  **RULES**
 * 
 * - There is a max capacity of 3 PIR motion sensors per PI. They can be installed on ports D2, D3, and D4 ONLY
 * 
 * - If a new sensor is installed, it must exist in the main DB, the table name must exist in THIS_PI.SENSOR_TABLES 
 * (and in the local DB itself), and the relationship port/id specified in this file
 * 
 * - The HDC1000 sensor (temp and hum) is a "2 in 1" sensor. Therefore, there must exist 2 ids for this sensor in the DB.
 * 
 *                                               PORTS / SENSORS
 *  PIR Motion: D2, D3, and/or D4
 *  Door:       A0, A1, and/or A2 
 *  HDC1000:    I2C-1
 */

var config = {};


config.THIS_PI = {};

//Sensor tables on local DB. Used to check local DB for data when Pi starts
config.THIS_PI.SENSOR_TABLES = ["temperature", "humidity", "motion", "door", "ra_bluetooth"];

//The relationship between GrovePi port numbers and sensor ids in this PI
/**
 * IMPORTANT: If adding a HDC1000 sensor (temperature and humidity), always specify the ids in the folling format: temperature id first, humidity id second
 * 
 * Example of config.THIS_PI.PORT_SENSORID:
 * 
 * SELECT * FROM SENSORS (main DB)
 * id   room_id     name    sensor_type
 * 1      1       HDC1000        TE         (attached to I2C-1)
 * 2      1       HDC1000        HU         (attached to I2C-1) - same as above
 * 3      2       PIR Motion     MO         (attached to D2)
 * 4      3       Door           DO         (attached to A0)
 * 
 * **Note that both TE and HU (ids 1 and 2) belong to the same physical sensor attached to the GrovePi. They must have different ids there.
 * 
 * Having the configuration above in mind, config.THIS_PI.PORT_SENSORID should look like that:
 * 
 *                                 Port    SensorID
 * config.THIS_PI.PORT_SENSORID = {'D2':    '3',
 *                                 'I2C-1': '1,2',
 *                                 'A0':    '4'};
 * 
 * 
 */
config.THIS_PI.PORT_SENSORID = {'D2': '24',
								'D3': '20',
								'D4': '22',
								'I2C-1': '13,14',
                                'A0': '16',
                                'A1': '23'
                                }; 

config.netServer = {};
config.netServer.PORT = 8124;

config.API = {};
config.API.LOGINPAGE = 'http://192.168.1.71:8080/envirosense/login';
config.API.NEWDATA =   'http://192.168.1.71:8080/envirosense/api/data/new';
config.API.EMAIL = 'breno.brezinski@edu.sait.ca';
config.API.PASSWORD = 'password';

config.DB = {};
config.DB.PORT = 3306;
config.DB.DB_NAME = 'envirosense';
config.DB.LOCALHOST = 'localhost';
config.DB.USERNAME = 'esdev';
config.DB.PASSWORD = 'password';

config.DB.INSERT_SENSOR_DATA =      "INSERT INTO %s SET sensor_id = %s, data = %s, timestamp = STR_TO_DATE(\'%s\','%Y %m %d %H %i %s')";
config.DB.INSERT_SENSOR_DATA_SIMP = "INSERT INTO %s SET sensor_id = %s, data = %s, timestamp = STR_TO_DATE(\'%s\','%a %b %d %Y %H:%i:%s GMT-0700 (MST)')";
config.DB.REMOVE_SENSOR_DATA = "DELETE FROM %s WHERE sensor_id = %s AND timestamp = STR_TO_DATE(\'%s\','%a %b %d %Y %H:%i:%s')";
config.DB.GET_LOCAL_SENSOR_DATA = 'SELECT * FROM %s';

module.exports = config;
