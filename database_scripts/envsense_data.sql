-- Users
INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('sergio.diaz.chavez@edu.sait.ca', 'Sergio', 'Diaz', '+11111111111', 'sergiologo', password('password'), 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('daniel.chau@edu.sait.ca', 'Daniel', 'Chau', '+11111111111', 'daniel.chau', password('password'), 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('jediah.dizon@edu.sait.ca', 'Jediah', 'dizon', '+11111111111', 'jediahjosuah', password('password'), 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('breno.brezinski@edu.sait.ca', 'Breno', 'Brezinski', '+11111111111', 'brezinski', password('password'), 1);

INSERT INTO envirosense.user(email, firstname, lastname, phone, slack_id, password, enabled)
values('francis.agyapong@edu.sait.ca', 'Francis', 'Agyapong', '+11111111111', 'francis36012', password('password'), 1);

-- Roles
INSERT INTO envirosense.user_role(user_email, role)
VALUES('sergio.diaz.chavez@edu.sait.ca', 'ROLE_USER');

INSERT INTO envirosense.user_role(user_email, role)
VALUES('daniel.chau@edu.sait.ca', 'ROLE_USER');

INSERT INTO envirosense.user_role(user_email, role)
VALUES('jediah.dizon@edu.sait.ca', 'ROLE_USER');

INSERT INTO envirosense.user_role(user_email, role)
VALUES('breno.brezinski@edu.sait.ca', 'ROLE_USER');

INSERT INTO envirosense.user_role(user_email, role)
VALUES('francis.agyapong@edu.sait.ca', 'ROLE_USER');

