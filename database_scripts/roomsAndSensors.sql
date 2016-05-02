INSERT INTO envirosense.room
VALUES
(1, 'MD307A', 'Server Room'),
(2, 'MD307B', 'Glen''s offices'),
(3, 'MD307C', 'Lunch Room (Fishbowl)'),
(4, 'MD307', 'Working Room'),
(5, 'MD308', 'Meeting Room'),
(6, 'LabEntrance', 'Lab entrance');

INSERT INTO envirosense.sensor
VALUES
-- server
(1, 1, 'HDC1000_1', 'TE'),
(2, 1, 'HDC1000_1', 'HU'),
(3, 1, 'PIRMotionSensor1', 'MO'),
(4, 1, 'DoorSensor1', 'DR'),
(5, 1, 'RAReelceiver1', 'RA'),
-- glen's office
(6, 2, 'PIRMotionSensor2', 'MO'),
(7, 2, 'DoorSensor2', 'DR'),
(8, 2, 'DoorSensor3', 'DR'),
-- lunch room
(9, 3, 'PIRMotionSensor3', 'MO'),
(10, 3, 'DoorSensor3', 'DR'),
-- working area
(11, 4, 'RAReelceiver2', 'RA'),
(12, 4, 'PIRMotionSensor4', 'MO'),
(13, 4, 'HDC1000_2', 'TE'),
(14, 4, 'HDC1000_2', 'HU'),
(15, 4, 'DoorSensor4', 'DR'),
(16, 4, 'DoorSensor5', 'DR'),
(24, 4, 'PIRMotionSensor8', 'MO'),
-- meeting room
(17, 5, 'HDC1000_3', 'TE'),
(18, 5, 'HDC1000_3', 'HU'),
(19, 5, 'PIRMotionSensor5', 'MO'),
(20, 5, 'PIRMotionSensor6', 'MO'),
(21, 5, 'RAReelceiver3', 'RA'),
-- entrance
(22, 6, 'PIRMotionSensor7', 'MO'),
(23, 5, 'DoorSensor6', 'DR');
