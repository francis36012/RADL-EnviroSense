-- condition_time 1
INSERT INTO condition_time
	(sunday, monday, tuesday, wednesday, thursday, friday, saturday, date_time, all_hours, time_check)
VALUES
	(b'1', b'1', b'1', b'1', b'1', b'1', b'1', STR_TO_DATE('2016-02-29 00:00:00', '%Y-%m-%d %H:%i:%s'), b'1', 'GT');

-- Temperature 20 or over for sensor 1
-- condition 1
INSERT INTO econdition
	(sensor_id, value, modifier, condition_time_id)
VALUES
	(1, 20.0, 'GE', 1);

INSERT INTO sensor_condition VALUES(1, 1);

-- event 1
INSERT INTO event
	(name, message, use_slack, use_email, use_phone, active)
VALUES
	('Temp1 20 or over', 'Temp1: It is getting too warm!', b'0', b'1', b'0', b'1');

INSERT INTO event_condition VALUES (1, 1);

INSERT INTO user_event
VALUES
	('francis.agyapong@edu.sait.ca', 1),
	('breno.brezinski@edu.sait.ca', 1),
	('daniel.chau@edu.sait.ca', 1),
	('sergio.diazchavez@edu.sait.ca', 1),
	('jediah.dizon@edu.sait.ca', 1);

--
-- condition_time 2
INSERT INTO condition_time
	(sunday, monday, tuesday, wednesday, thursday, friday, saturday, date_time, all_hours, time_check)
VALUES
	(b'1', b'1', b'1', b'1', b'1', b'1', b'1', STR_TO_DATE('2016-02-29 19:00:00', '%Y-%m-%d %H:%i:%s'), b'1', 'GE');

-- Motion detected by motion sensor with id 3
-- condition 1
INSERT INTO econdition
	(sensor_id, value, modifier, condition_time_id)
VALUES
	(3, 'true', 'EQ', 2);

INSERT INTO sensor_condition VALUES(3, 2);

-- event 2
INSERT INTO event
	(name, message, use_slack, use_email, use_phone, active)
VALUES
	('Motion3: Motion detected', 'Motion detected', b'1', b'1', b'0', b'1');

INSERT INTO event_condition VALUES (2, 2);

INSERT INTO user_event
VALUES
	('francis.agyapong@edu.sait.ca', 2),
	('breno.brezinski@edu.sait.ca', 2),
	('daniel.chau@edu.sait.ca', 2),
	('sergio.diazchavez@edu.sait.ca', 2),
	('jediah.dizon@edu.sait.ca', 2);
