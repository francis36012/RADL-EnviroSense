DROP DATABASE IF EXISTS envirosense;
CREATE DATABASE envirosense;

DROP USER IF EXISTS 'esdev'@'localhost';
DROP USER IF EXISTS 'esdev'@'%';

CREATE USER 'esdev'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'esdev'@'%' IDENTIFIED BY 'password';

use envirosense;
GRANT ALL PRIVILEGES ON * . * TO 'esdev'@'localhost';
GRANT ALL PRIVILEGES ON * . * TO 'esdev'@'%'; -- probably a bad idea, network access

-- REVOKE ALL PRIVILEGES ON *.* FROM 'esdev'@'%'; -- If network access is not needed
FLUSH PRIVILEGES;