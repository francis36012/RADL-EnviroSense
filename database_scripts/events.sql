-- condition_time 1
INSERT INTO envirosense.condition_time
VALUES
	(1, b'1', b'1', b'1', b'1', b'1', b'1', b'1', '2016-02-29 00:00:00', b'1', 'GT');

-- Temperature 15 or over for sensor 1 (in server room)
-- condition 1
INSERT INTO envirosense.econdition
VALUES
	(1, 1, 15.0, 'GE', 1);

INSERT INTO envirosense.sensor_condition VALUES(1, 1);

-- event 1
INSERT INTO envirosense.event
VALUES
	(1, 'Server room getting hot', 'Temp1: It''s getting too warm!', b'0', b'1', b'0', b'1');

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
	(2, b'1', b'1', b'1', b'1', b'1', b'1', b'1', '2016-02-29 19:00:00', b'0', 'GE');

-- Motion detected by motion sensor 3 (server room), 12, and 24 (working area)
-- condition 1
INSERT INTO envirosense.econdition
VALUES
	(2, 3, 'true', 'EQ', 2),
	(3, 12, 'true', 'EQ', 2),
	(4, 24, 'true', 'EQ', 2);

INSERT INTO envirosense.sensor_condition
VALUES
	(3, 2),
	(12, 3),
	(24, 4);

-- event 2
INSERT INTO envirosense.event
VALUES
	(2, 'Motion3_12_24', 'Motion detected in server room or working area', b'1', b'1', b'0', b'1');

INSERT INTO envirosense.event_condition VALUES (2, 2);
INSERT INTO envirosense.event_condition VALUES (2, 3);
INSERT INTO envirosense.event_condition VALUES (2, 4);

INSERT INTO envirosense.user_event
VALUES
	('francis.agyapong@edu.sait.ca', 2),
	('breno.brezinski@edu.sait.ca', 2),
	('daniel.chau@edu.sait.ca', 2),
	('sergio.diazchavez@edu.sait.ca', 2),
	('jediah.dizon@edu.sait.ca', 2);
