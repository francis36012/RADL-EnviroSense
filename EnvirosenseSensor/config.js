var config = {};

config.netServer = {};
config.netServer.PORT = 8124;

config.DB = {};
config.DB.PORT = 3306;
config.DB.DB_NAME = 'test';
config.DB.HOST = '192.168.1.69';
config.DB.LOCALHOST = 'localhost';
config.DB.USERNAME = 'root';
config.DB.PASSWORD = 'password';

config.DB.INSERT_SENSOR_DATA = "INSERT INTO %s SET sensor_id = %s, data = %s, date = STR_TO_DATE(\'%s\','%Y %m %d %H %i %s')";

config.ENVIROSENSE = {};
config.ENVIROSENSE.ROOMID = 1;

module.exports = config;
