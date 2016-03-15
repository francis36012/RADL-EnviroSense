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
	data BOOLEAN NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_motion PRIMARY KEY (sensor_id, timestamp)
);

DROP TABLE IF EXISTS door;
CREATE TABLE door (
	sensor_id BIGINT NOT NULL,
	data BOOLEAN NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_door PRIMARY KEY (sensor_id, timestamp)
);

DROP TABLE IF EXISTS bluetooth_beacon;
CREATE TABLE bluetooth_beacon (
	id BIGINT NOT NULL,
	user_email VARCHAR(60) NOT NULL,
	CONSTRAINT pk_blebeacon PRIMARY KEY (id)
);


DROP TABLE IF EXISTS ra_bluetooth;
CREATE TABLE ra_bluetooth (
	sensor_id BIGINT NOT NULL,
	beacon_id BIGINT NOT NULL,
	rssi_value BIGINT NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_rabluetooth PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_bluetooth_beacon FOREIGN KEY (beacon_id) REFERENCES bluetooth_beacon(id)
);
