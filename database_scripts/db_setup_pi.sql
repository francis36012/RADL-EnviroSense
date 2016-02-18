DROP DATABASE IF EXISTS envirosense;
CREATE DATABASE envirosense;

DROP USER 'esdev'@'localhost';

CREATE USER 'esdev'@'localhost' IDENTIFIED BY 'password';

use envirosense;
GRANT ALL PRIVILEGES ON * . * TO 'esdev'@'localhost';

FLUSH PRIVILEGES;
