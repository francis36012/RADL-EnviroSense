DROP TABLE IF EXISTS user;
CREATE TABLE user (
	email VARCHAR(60) NOT NULL,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	phone VARCHAR(12) NOT NULL,
	slack_id VARCHAR(40) NOT NULL,
	password VARCHAR(100) NOT NULL,
	enabled BIT NOT NULL DEFAULT 1,
	CONSTRAINT pk_user PRIMARY KEY (email)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
	role VARCHAR(60) NOT NULL,
	CONSTRAINT pk_role PRIMARY KEY (role)
);

DROP TABLE IF EXISTS user_role;
CREATE TABLE user_role (
	user_role VARCHAR(60) NOT NULL,
	user_email VARCHAR(60) NOT NULL,
	CONSTRAINT PRIMARY KEY (user_role, user_email),
	CONSTRAINT fk_urole_email FOREIGN KEY (user_email) REFERENCES user(email),
	CONSTRAINT fk_urole_id FOREIGN KEY (user_role) REFERENCES role(role)
);

DROP TABLE IF EXISTS room;
CREATE TABLE room (
	id BIGINT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	description VARCHAR(100) NOT NULL,
	CONSTRAINT pk_room PRIMARY KEY (id)
);

DROP TABLE IF EXISTS sensor;
CREATE TABLE sensor (
	id BIGINT AUTO_INCREMENT,
	room_id BIGINT NOT NULL,
	name VARCHAR(20) NOT NULL,
	sensor_type CHAR(2) NOT NULL,
	CONSTRAINT pk_sensor PRIMARY KEY (id),
	CONSTRAINT fk_room_sensor FOREIGN KEY (room_id) REFERENCES room(id),
	CONSTRAINT ck_sensor_type CHECK (sensor_type IN ('TE', 'HU', 'DO', 'MO', 'RA'))
);

DROP TABLE IF EXISTS event;
CREATE TABLE event (
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

DROP TABLE IF EXISTS condition_time;
CREATE TABLE condition_time (
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

DROP TABLE IF EXISTS econdition;
CREATE TABLE econdition (
	id BIGINT AUTO_INCREMENT,
	sensor_id BIGINT NOT NULL,
	value VARCHAR(10) NOT NULL,
	modifier VARCHAR(10) NOT NULL,
	condition_time_id BIGINT NOT NULL,
	CONSTRAINT pk_econdition PRIMARY KEY (id),
	CONSTRAINT fk_econdition_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id),
	CONSTRAINT fk_econdition_time FOREIGN KEY (condition_time_id) REFERENCES condition_time(id)
);

DROP TABLE IF EXISTS temperature;
CREATE TABLE temperature (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(5, 2) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_temperature PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_temperature_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS humidity;
CREATE TABLE humidity (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(5, 2) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_humidity PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_humidity_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS motion;
CREATE TABLE motion (
	sensor_id BIGINT NOT NULL,
	data BOOLEAN NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_motion PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_motion_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS door;
CREATE TABLE door (
	sensor_id BIGINT NOT NULL,
	data BOOLEAN NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_door PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_door_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS ra_bluetooth;
CREATE TABLE ra_bluetooth (
	sensor_id BIGINT NOT NULL,
	name VARCHAR(60) NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT pk_rabluetooth PRIMARY KEY (sensor_id, timestamp),
	CONSTRAINT fk_bluetooth_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);


DROP TABLE IF EXISTS sensor_condition;
CREATE TABLE sensor_condition (
	sensor_id BIGINT,
	condition_id BIGINT,
	CONSTRAINT pk_sensor_condition PRIMARY KEY (sensor_id, condition_id),
	CONSTRAINT fk_sc_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id),
	CONSTRAINT fk_sc_econdition FOREIGN KEY (condition_id) REFERENCES econdition(id)
);

DROP TABLE IF EXISTS event_condition;
CREATE TABLE event_condition (
	event_id BIGINT,
	condition_id BIGINT,
	CONSTRAINT pk_event_condition PRIMARY KEY (event_id, condition_id),
	CONSTRAINT fk_ec_event FOREIGN KEY (event_id) REFERENCES event(id),
	CONSTRAINT fk_ec_condition FOREIGN KEY (condition_id) REFERENCES econdition(id)
);

DROP TABLE IF EXISTS user_event;
CREATE TABLE user_event (
	user_email VARCHAR(60),
	event_id BIGINT,
	CONSTRAINT pk_user_event PRIMARY KEY (user_email, event_id),
	CONSTRAINT fk_ue_user FOREIGN KEY (user_email) REFERENCES user(email),
	CONSTRAINT fk_ue_event FOREIGN KEY (event_id) REFERENCES event(id)
);
