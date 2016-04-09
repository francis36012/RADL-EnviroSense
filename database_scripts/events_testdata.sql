-- condition_time 1
INSERT INTO envirosense.condition_time
VALUES
	(1, b'1', b'1', b'1', b'1', b'1', b'1', b'1', STR_TO_DATE('2016-02-29 00:00:00', '%Y-%m-%d %H:%i:%s'), b'1', 'GT');

-- Temperature 20 or over for sensor 1
-- condition 1
INSERT INTO envirosense.econdition
	(sensor_id, value, modifier, condition_time_id)
VALUES
	(1, 1, 20.0, 'GE', 1);

INSERT INTO envirosense.sensor_condition VALUES(1, 1);

-- event 1
INSERT INTO envirosense.event
VALUES
	(1, 'Temp1 20 or over', 'Temp1: It is getting too warm!', b'0', b'1', b'0', b'1');

INSERT INTO envirosense.event_condition VALUES(1, 1);

INSERT INTO envirosense.user_event
VALUES
	('francis.agyapong@edu.sait.ca', 1),
	('breno.brezinski@edu.sait.ca', 1),
	('daniel.chau@edu.sait.ca', 1),
	('sergio.diazchavez@edu.sait.ca', 1),
	('jediah.dizon@edu.sait.ca', 1);

--
-- condition_time 2
INSERT INTO envirosense.condition_time
VALUES
	(2, b'1', b'1', b'1', b'1', b'1', b'1', b'1', STR_TO_DATE('2016-02-29 19:00:00', '%Y-%m-%d %H:%i:%s'), b'1', 'GE');

-- Motion detected by motion sensor with id 3
-- condition 1
INSERT INTO envirosense.econdition
VALUES
	(2, 3, 'true', 'EQ', 2);

INSERT INTO envirosense.sensor_condition VALUES(3, 2);

-- event 2
INSERT INTO envirosense.event
VALUES
	(2, 'Motion3: Motion detected', 'Motion detected', b'1', b'1', b'0', b'1');

INSERT INTO envirosense.event_condition VALUES (2, 2);

INSERT INTO envirosense.user_event
VALUES
	('francis.agyapong@edu.sait.ca', 2),
	('breno.brezinski@edu.sait.ca', 2),
	('daniel.chau@edu.sait.ca', 2),
	('sergio.diazchavez@edu.sait.ca', 2),
	('jediah.dizon@edu.sait.ca', 2);
