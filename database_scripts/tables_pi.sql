DROP TABLE IF EXISTS temperature;
CREATE TABLE temperature (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(5, 2) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_temperature PRIMARY KEY (sensor_id, timestamp)
);

DROP TABLE IF EXISTS humidity;
CREATE TABLE humidity (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(5, 2) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_humidity PRIMARY KEY (sensor_id, timestamp)
);

DROP TABLE IF EXISTS motion;
CREATE TABLE motion (
	sensor_id BIGINT NOT NULL,
	data BIT(1) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_motion PRIMARY KEY (sensor_id, timestamp)
);

DROP TABLE IF EXISTS door;
CREATE TABLE door (
	sensor_id BIGINT NOT NULL,
	data BIT(1) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_door PRIMARY KEY (sensor_id, timestamp)
);

DROP TABLE IF EXISTS ra_bluetooth;
CREATE TABLE ra_bluetooth (
	sensor_id BIGINT NOT NULL,
	name VARCHAR(60) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_rabluetooth PRIMARY KEY (sensor_id, timestamp)
);
