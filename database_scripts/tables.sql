DROP TABLE IF EXISTS user;
CREATE TABLE user (
	id BIGINT AUTO_INCREMENT,
	email VARCHAR(60) NOT NULL,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	phone VARCHAR(12) NOT NULL,
	slack_id VARCHAR(40) NOT NULL,
	password VARCHAR(100) NOT NULL,
	enabled BIT NOT NULL DEFAULT 1,
	CONSTRAINT pk_user PRIMARY KEY (id),
	CONSTRAINT uk_user_email UNIQUE KEY (email)
);

DROP TABLE IF EXISTS user_role;
CREATE TABLE user_role (
	user_role_id BIGINT AUTO_INCREMENT,
	user_email VARCHAR(60) NOT NULL,
	role VARCHAR(45) NOT NULL,
	CONSTRAINT pk_user_role PRIMARY KEY (user_role_id),
	CONSTRAINT fk_urole_email FOREIGN KEY (user_email) REFERENCES user(email),
	UNIQUE KEY uk_email_role(role, user_email),
	KEY fk_email_idx (user_email)
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
	owner_email VARCHAR(30) NOT NULL,
	message VARCHAR(150) NOT NULL,
	is_active BIT NOT NULL,
	use_slack BIT NOT NULL,
	use_email BIT NOT NULL,
	use_phone BIT NOT NULL,
	CONSTRAINT pk_event PRIMARY KEY (id),
	CONSTRAINT fk_event_user FOREIGN KEY (owner_email) REFERENCES user(email)
);

DROP TABLE IF EXISTS ev_condition;
CREATE TABLE ev_condition (
	id BIGINT AUTO_INCREMENT,
	sensor_id BIGINT NOT NULL,
	value VARCHAR(10) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT pk_evcondition PRIMARY KEY (id),
	CONSTRAINT fk_evcondition_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS temperature;
CREATE TABLE temperature (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(3, 2) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT fk_temperature_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS humidity;
CREATE TABLE humidity (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(3, 2) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT fk_humidity_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS motion;
CREATE TABLE motion (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(3, 2) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT fk_motion_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS door;
CREATE TABLE door (
	sensor_id BIGINT NOT NULL,
	data DECIMAL(3, 2) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT fk_door_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);

DROP TABLE IF EXISTS ra_bluetooth;
CREATE TABLE ra_bluetooth (
	sensor_id BIGINT NOT NULL,
	name VARCHAR(60) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT fk_bluetooth_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id)
);


DROP TABLE IF EXISTS sensor_condition;
CREATE TABLE sensor_condition (
	sensor_id BIGINT,
	condition_id BIGINT,
	CONSTRAINT pk_sensor_condition PRIMARY KEY (sensor_id, condition_id),
	CONSTRAINT fk_sc_sensor FOREIGN KEY (sensor_id) REFERENCES sensor(id),
	CONSTRAINT fk_sc_condition FOREIGN KEY (condition_id) REFERENCES ev_condition(id)
);

DROP TABLE IF EXISTS event_condition;
CREATE TABLE event_condition (
	event_id BIGINT,
	condition_id BIGINT,
	CONSTRAINT pk_event_condition PRIMARY KEY (event_id, condition_id),
	CONSTRAINT fk_ec_event FOREIGN KEY (event_id) REFERENCES event(id),
	CONSTRAINT fk_ec_condition FOREIGN KEY (condition_id) REFERENCES ev_condition(id)
);