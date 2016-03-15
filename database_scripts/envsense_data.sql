-- Users
INSERT INTO envirosense.user(
	email, firstname, lastname, phone, slack_id, password, salt, enabled
)
values(
	'sergio.diazchavez@edu.sait.ca',
	'Sergio',
	'Diaz',
	'+11111111111',
	'sergiologo',
	'99517e37c596aaee5f0a23e95c8cd8e8',
	'8aa372360fdd884988fd1710f683e335620d29741476149c954c3c3f7f7ab98a',
	1
);

INSERT INTO envirosense.user(
	email, firstname, lastname, phone, slack_id, password, salt, enabled
)
values(
	'daniel.chau@edu.sait.ca',
	'Daniel',
	'Chau',
	'+11111111111',
	'daniel.chau',
	'12bc6eea8a1f9ac66175eb709d236d83',
	'624d84fbdb8c82499214c51d089b832caebf8dff1a6aacf97dbc8f732162d14e',
	1
);


INSERT INTO envirosense.user(
	email, firstname, lastname, phone, slack_id, password, salt, enabled
)
values(
	'jediah.dizon@edu.sait.ca',
	'Jediah',
	'dizon',
	'+11111111111',
	'jediahjosuah',
	'3a2ccb1bb2c6307db1f8eda1740874fe',
	'a9cbdc1fb5681f023636240c92422d613977f90d3b80270a9f7d6858a486b383',
	1
);

INSERT INTO envirosense.user(
	email, firstname, lastname, phone, slack_id, password, salt, enabled
)
values(
	'breno.brezinski@edu.sait.ca',
	'Breno',
	'Brezinski',
	'+11111111111',
	'brezinski',
	'1f8af58fc18403033e5e64be21d46f9b',
	'c63b0448525036d9f2b133d2dbe91887ef2a26d1492cfcef7b9a9966f9d0b133',
	1
);

INSERT INTO envirosense.user(
	email, firstname, lastname, phone, slack_id, password, salt, enabled
)
values(
	'francis.agyapong@edu.sait.ca',
	'Francis',
	'Agyapong',
	'+11111111111',
	'francis36012',
	'4baa7e8c0a152e58fbc1cf2a24dc8290',
	'd4ee869da229068d1185087affbf19321d21e862cd16e40cafa7410f71a8003d',
	1
);
 
-- Roles
INSERT INTO role(role) values('ADMIN');
INSERT INTO role(role) values('USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('sergio.diazchavez@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('daniel.chau@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('jediah.dizon@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('breno.brezinski@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('francis.agyapong@edu.sait.ca', 'USER');

