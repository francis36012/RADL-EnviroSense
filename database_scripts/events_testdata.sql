INSERT INTO condition_time
	(sunday, monday, tuesday, wednesday, thursday, friday, saturday, date_time, all_hours, time_check)
VALUES
	(b'1', b'1', b'1', b'1', b'1', b'1', b'1', DATE('2016-02-29 00:00:00'), b'1', 'GT');
	
INSERT INTO econdition
	(sensor_id, value, modifier, condition_time_id)
VALUES
	(1, 20.0, "GE", 1);

INSERT INTO sensor_condition VALUES(1, 1);

INSERT INTO event
	(name, message, use_slack, use_email, use_phone, active)
VALUES
	('Temp1 20 or over', 'Temp1: It\'s getting too warm!', b'0', b'1', b'0', b'1');

INSERT INTO event_condition VALUES (1, 1);

INSERT INTO user_event
VALUES
	('francis.agyapong@edu.sait.ca', 1),
	('breno.brezinski@edu.sait.ca', 1),
	('daniel.chau@edu.sait.ca', 1),
	('sergio.diazchavez@edu.sait.ca', 1),
	('jediah.dizon@edu.sait.ca', 1);
