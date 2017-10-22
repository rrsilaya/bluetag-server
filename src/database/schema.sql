-- User
DROP USER IF EXISTS 'bluetag'@'localhost';
CREATE USER 'bluetag'@'localhost' IDENTIFIED BY 'bluetagadmin';

-- Database
DROP DATABASE IF EXISTS apparel;
CREATE DATABASE apparel;

-- Grant Privileges
GRANT SUPER ON *.* TO 'bluetag'@'localhost';
GRANT ALL PRIVILEGES ON apparel.* TO 'bluetag'@'localhost';

USE apparel;

CREATE TABLE employee (
	username VARCHAR(10) NOT NULL,
  password VARCHAR(24) NOT NULL, -- to be adjusted (for encyrption)
  type ENUM(
    'manager',
    'employee'
  ) DEFAULT 'employee' NOT NULL,

	CONSTRAINT employee_username_pk
    PRIMARY KEY(username),
  CONSTRAINT employee_username_uk
    UNIQUE KEY(username)
);

CREATE TABLE audit (
  id VARCHAR(16) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  employee VARCHAR(10) NOT NULL,
  action ENUM(
    'view',
    'add',
    'sell',
    'remove',
    'modify'
  ) DEFAULT 'view' NOT NULL,

  CONSTRAINT audit_id_pk
    PRIMARY KEY(id),
  CONSTRAINT audit_employee_fk
    FOREIGN KEY(employee)
    REFERENCES employee(username)
);

CREATE TABLE orderRequest (
  id VARCHAR(16) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  status ENUM(
    'pending',
    'delivered',
    'cancelled'
  ) DEFAULT 'pending' NOT NULL,

  CONSTRAINT orderRequest_id_pk
    PRIMARY KEY(id)
);

CREATE TABLE orderRequestItem (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(30) NOT NULL,
  qty INT DEFAULT 1 NOT NULL,
  request VARCHAR(16) NOT NULL,

  CONSTRAINT orderRequestItem_id_pk
    PRIMARY KEY(id),
  CONSTRAINT orderRequestItem_id_fk
    FOREIGN KEY(request)
    REFERENCES orderRequest(id)
);

CREATE TABLE apparel (
  id VARCHAR(16) NOT NULL,
  type VARCHAR(30) NOT NULL,
  size VARCHAR(10) NOT NULL,
  color VARCHAR(20),
  qty INT DEFAULT 1 NOT NULL,
  price DECIMAL NOT NULL,
  deliveryDate TIMESTAMP NOT NULL,

  CONSTRAINT apparel_id_pk
    PRIMARY KEY(id)
);

CREATE TABLE discount (
  id INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  rate INT NOT NULL,
  isActive BOOLEAN DEFAULT true NOT NULL,
  apparel VARCHAR(16) NOT NULL,

  CONSTRAINT discount_id_pk
    PRIMARY KEY(id),
  CONSTRAINT discount_apparel_fk
    FOREIGN KEY(apparel)
    REFERENCES apparel(id)
);

CREATE TABLE sale (
  id INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  qty INT DEFAULT 1 NOT NULL,
  apparel VARCHAR(16) NOT NULL,

  CONSTRAINT sale_id_pk
    PRIMARY KEY(id),
  CONSTRAINT sale_aparel_pk
    FOREIGN KEY(apparel)
    REFERENCES apparel(id)
);

INSERT INTO employee VALUES ('admin', 'admin', 'manager');