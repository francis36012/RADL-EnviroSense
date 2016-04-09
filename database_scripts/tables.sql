use envirosense;

DROP TABLE IF EXISTS envirosense.user;
CREATE TABLE envirosense.user (
	email VARCHAR(60) NOT NULL,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	phone VARCHAR(12) NOT NULL,
	slack_id VARCHAR(40) NOT NULL,
	password CHAR(32) NOT NULL,
	salt CHAR(64) NOT NULL,
	enabled BIT NOT NULL DEFAULT 1,
	CONSTRAINT pk_user PRIMARY KEY (email)
);

DROP TABLE IF EXISTS envirosense.role;
CREATE TABLE envirosense.role (
	role VARCHAR(60) NOT NULL,
	CONSTRAINT pk_role PRIMARY KEY (role)
);

DROP TABLE IF EXISTS envirosense.user_role;
CREATE TABLE envirosense.user_role (
	user_role VARCHAR(60) NOT NULL,
	user_email VARCHAR(60) NOT NULL,
	CONSTRAINT PRIMARY KEY (user_role, user_email),
	CONSTRAINT fk_urole_email FOREIGN KEY (user_email) REFERENCES user(email),
	CONSTRAINT fk_urole_id FOREIGN KEY (user_role) REFERENCES role(role)
);

DROP TABLE IF EXISTS envirosense.room;
CREATE TABLE envirosense.room (
	id BIGINT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(100) NOT NULL,
	CONSTRAINT pk_room PRIMARY KEY (id)
);

DROP TABLE IF EXISTS envirosense.sensor;
CREATE TABLE envirosense.sensor (
	id BIGINT AUTO_INCREMENT,
	room_id BIGINT NOT NULL,
	name VARCHAR(20) NOT NULL,
	sensor_type CHAR(2) NOT NULL,
	CONSTRAINT pk_sensor PRIMARY KEY (id),
	CONSTRAINT fk_room_sensor FOREIGN KEY (room_id) REFERENCES room(id),
	CONSTRAINT ck_sensor_type CHECK (sensor_type IN ('TE', 'HU', 'DR', 'MO', 'RA'))
);

DROP TABLE IF EXISTS envirosense.event;
CREATE TABLE envirosense.event (
	id BIGINT AUTO_INCREMENT,
	name VARCHAR(60) NOT NULL,
	message VARCHAR(150) NOT NULL,
	use_slack BIT NOT NULL,
	use_email BIT NOT NULL,
	use_phone BIT NOT NULL,
	active BIT NOT NULL,
	CONSTRAINT pk_event PRIMARY KEY (id),
	CONSTRAINT uk_event_name UNIQUE KEY (name)
);

DROP TABLE IF EXISTS envirosense.condition_time;
CREATE TABLE envirosense.condition_time (
	id BIGINT AUTO_INCREMENT,
	sunday BIT(1) NOT NULL,
	monday BIT(1) NOT NULL,
	tuesday BIT(1) NOT NULL,
	wednesday BIT(1) NOT NULL,
	thursday BIT(1) NOT NULL,
	friday BIT(1) NOT NULL,
	saturday BIT(1) NOT NULL,
	date_time Date NOT NULL,
	all_hours BIT(1) NOT NULL,
	time_check VARCHAR(10) NOT NULL,
	CONSTRAINT pk_conditiontime PRIMARY KEY (id)
);

DROP TABLE IF EXISTS envirosense.econdition;
CREATE TABLE envirosense.econdition (
	id BIGINT AUTO_INCREMENT,
	sensor_id BIGINT NOT NULL,
	value VARCHAR(10) NOT NULL,
	modifier VARCHAR(10) NOT NULL,
	condition_time_id BIGINT NOT NULL,
	CONSTRAINT pk_econdition PRIMARY KEY (id),
	CONSTRAINT fk_econdition_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id),
	CONSTRAINT fk_econdition_time FOREIGN KEY (condition_time_id) REFERENCES condition_time(id)
);

DROP TABLE IF EXISTS envirosense.temperature;
CREATE TABLE envirosense.temperature (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(5, 2) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_temperature PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_temperature_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS envirosense.humidity;
CREATE TABLE envirosense.humidity (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(5, 2) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_humidity PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_humidity_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS envirosense.motion;
CREATE TABLE envirosense.motion (
	sensor_id BIGINT NOT NULL,
	data BOOLEAN NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_motion PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_motion_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS envirosense.door;
CREATE TABLE envirosense.door (
	sensor_id BIGINT NOT NULL,
	data BOOLEAN NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_door PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_door_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS envirosense.bluetooth_beacon;
CREATE TABLE envirosense.bluetooth_beacon (
	id VARCHAR(60) NOT NULL,
	user_email VARCHAR(60) NOT NULL,
	CONSTRAINT pk_blebeacon PRIMARY KEY (id)
);


DROP TABLE IF EXISTS envirosense.ra_bluetooth;
CREATE TABLE envirosense.ra_bluetooth (
	sensor_id BIGINT NOT NULL,
	beacon_id VARCHAR(60)NOT NULL,
	rssi BIGINT NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_rabluetooth PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_bluetooth_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id),
	CONSTRAINT fk_bluetooth_beacon FOREIGN KEY (beacon_id) REFERENCES bluetooth_beacon(id)
);


DROP TABLE IF EXISTS envirosense.sensor_condition;
CREATE TABLE envirosense.sensor_condition (
	sensor_id BIGINT,
	condition_id BIGINT,
	CONSTRAINT pk_sensor_condition PRIMARY KEY (sensor_id, condition_id),
	CONSTRAINT fk_sc_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id),
	CONSTRAINT fk_sc_econdition FOREIGN KEY (condition_id) REFERENCES econdition(id)
);

DROP TABLE IF EXISTS envirosense.event_condition;
CREATE TABLE envirosense.event_condition (
	event_id BIGINT,
	condition_id BIGINT,
	CONSTRAINT pk_event_condition PRIMARY KEY (event_id, condition_id),
	CONSTRAINT fk_ec_event FOREIGN KEY (event_id) REFERENCES event(id),
	CONSTRAINT fk_ec_condition FOREIGN KEY (condition_id) REFERENCES econdition(id)
);

DROP TABLE IF EXISTS envirosense.user_event;
CREATE TABLE envirosense.user_event (
	user_email VARCHAR(60),
	event_id BIGINT,
	CONSTRAINT pk_user_event PRIMARY KEY (user_email, event_id),
	CONSTRAINT fk_ue_user FOREIGN KEY (user_email) REFERENCES user(email),
	CONSTRAINT fk_ue_event FOREIGN KEY (event_id) REFERENCES event(id)
);
