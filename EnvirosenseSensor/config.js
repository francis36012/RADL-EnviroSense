var config = {};


config.THIS_PI = {};
config.THIS_PI.ROOMID = 1;
config.THIS_PI.SENSOR_TABLES = ["temperature", "humidity", "motion"];

config.THIS_PI.SENSORS_IDS = {};

config.netServer = {};
config.netServer.PORT = 8124;

config.DB = {};
config.DB.PORT = 3306;
config.DB.DB_NAME = 'envirosense';
config.DB.HOST = '192.168.1.69';
config.DB.LOCALHOST = 'localhost';
config.DB.USERNAME = 'esdev';
config.DB.PASSWORD = 'password';

config.DB.INSERT_SENSOR_DATA =      "INSERT INTO %s SET sensor_id = %s, data = %s, timestamp = STR_TO_DATE(\'%s\','%Y %m %d %H %i %s')";
config.DB.INSERT_SENSOR_DATA_SIMP = "INSERT INTO %s SET sensor_id = %s, data = %s, timestamp = STR_TO_DATE(\'%s\','%a %b %d %Y %H:%i:%s GMT-0700 (MST)')";
config.DB.REMOVE_SENSOR_DATA = "DELETE FROM %s WHERE sensor_id = %s AND timestamp = STR_TO_DATE(\'%s\','%a %b %d %Y %H:%i:%s GMT-0700 (MST)')";
config.DB.GET_LOCAL_SENSOR_DATA = 'SELECT * FROM %s';
config.DB.GET_LOCAL_SENSORS = 'SELECT * FROM sensor WHERE room_id = ' + config.THIS_PI.ROOMID;

module.exports = config;
