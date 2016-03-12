/**
 *   RULES
 * 
 * - There is a max capacity of 3 PIR motion sensors per PI. They can be installed on ports D2, D3, and D4 ONLY
 * - If a new sensor is installed, it must exist in the DB, and the relationship port/id specified in this file
 * - The HDC1000 sensor (temp and hum) is a "2 in 1" sensor. Therefore, there must exist 2 ids for this sensor in the DB. The way of specifying this sensor here is: e.g. 'I2C-2': '1,2' (being 1 and 2 the temperature and humidity ids respectively. They MUST follow this order)
 */

var config = {};


config.THIS_PI = {};
//Sensor tables on local DB
config.THIS_PI.SENSOR_TABLES = ["temperature", "humidity", "motion", "door"];
//The ids of the sensors installed in this PI
config.THIS_PI.PORT_SENSORID = {'D2': '3',
                                'I2C-1': '1,2',
                                'A0': '5'}; 
                                //'A0': '5'};

config.netServer = {};
config.netServer.PORT = 8124;

config.API = {};
config.API.LOGINPAGE = 'http://192.168.1.68:8080/envirosense/login';
config.API.NEWDATA =   'http://192.168.1.68:8080/envirosense/api/data/new';
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
config.DB.REMOVE_SENSOR_DATA = "DELETE FROM %s WHERE sensor_id = %s AND timestamp = STR_TO_DATE(\'%s\','%a %b %d %Y %H:%i:%s GMT-0700 (MST)')";
config.DB.GET_LOCAL_SENSOR_DATA = 'SELECT * FROM %s';
//config.DB.GET_LOCAL_SENSORS = 'SELECT * FROM sensor WHERE room_id = ' + config.THIS_PI.ROOMID;

module.exports = config;
