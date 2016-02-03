-- Users
INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('sergio.diaz.chavez@edu.sait.ca', 'Sergio', 'Diaz', '+11111111111', 'sergiologo', '5f4dcc3b5aa765d61d8327deb882cf99', 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('daniel.chau@edu.sait.ca', 'Daniel', 'Chau', '+11111111111', 'daniel.chau', '5f4dcc3b5aa765d61d8327deb882cf99', 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('jediah.dizon@edu.sait.ca', 'Jediah', 'dizon', '+11111111111', 'jediahjosuah', '5f4dcc3b5aa765d61d8327deb882cf99', 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('breno.brezinski@edu.sait.ca', 'Breno', 'Brezinski', '+11111111111', 'brezinski', '5f4dcc3b5aa765d61d8327deb882cf99', 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('francis.agyapong@edu.sait.ca', 'Francis', 'Agyapong', '+11111111111', 'francis36012', '5f4dcc3b5aa765d61d8327deb882cf99', 1);

-- Roles
INSERT INTO role(role) values('ADMIN');
INSERT INTO role(role) values('USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('sergio.diaz.chavez@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('daniel.chau@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('jediah.dizon@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('breno.brezinski@edu.sait.ca', 'USER');

INSERT INTO envirosense.user_role(user_email, user_role)
VALUES('francis.agyapong@edu.sait.ca', 'USER');

