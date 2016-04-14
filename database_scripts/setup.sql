DROP DATABASE IF EXISTS envirosense;
CREATE DATABASE envirosense;

DROP USER IF EXISTS 'esdev'@'localhost';
DROP USER IF EXISTS 'esapp'@'localhost';

CREATE USER 'esdev'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'esapp'@'localhost' IDENTIFIED BY 'password';

use envirosense;
GRANT ALL PRIVILEGES ON envirosense.* TO 'esdev'@'localhost';
GRANT UPDATE, DELETE, INSERT, SELECT, ALTER ON envirosense.* TO 'esapp'@'localhost';

-- REVOKE ALL PRIVILEGES ON *.* FROM 'esdev'@'%'; -- If network access is not needed
FLUSH PRIVILEGES;
