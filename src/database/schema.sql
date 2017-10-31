-- User
DROP USER IF EXISTS 'bt_default'@'localhost';
DROP USER IF EXISTS 'bt_master'@'localhost';
DROP USER IF EXISTS 'bt_employee'@'localhost';
CREATE USER 'bt_default'@'localhost' IDENTIFIED BY 'default';
CREATE USER 'bt_master'@'localhost' IDENTIFIED BY 'master';
CREATE USER 'bt_employee'@'localhost' IDENTIFIED BY 'employee';

-- Database
DROP DATABASE IF EXISTS bluetag;
CREATE DATABASE bluetag;

USE bluetag;

-- Database Definition
CREATE TABLE employee (
  `id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(10) NOT NULL,
  `password` VARCHAR(24) NOT NULL, -- to be adjusted (for encyrption)
  `type` ENUM(
    'manager',
    'employee'
  ) DEFAULT 'employee' NOT NULL,

	CONSTRAINT employee_username_pk
    PRIMARY KEY(`id`),
  CONSTRAINT employee_username_uk
    UNIQUE KEY(`username`)
);

CREATE TABLE log (
  `id` VARCHAR(17) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `action` VARCHAR(30) NOT NULL,
  `notes` TEXT NOT NULL, -- specifies other details in the action
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `audit_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `audit_employee_fk`
    FOREIGN KEY(`employee`)
    REFERENCES employee(`username`)
);

CREATE TABLE orderRequest (
  `id` VARCHAR(17) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `status` ENUM(
    'pending',
    'delivered',
    'cancelled'
  ) DEFAULT 'pending' NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `orderRequest_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `orderRequest_employee_fk`
    FOREIGN KEY(`employee`)
    REFERENCES employee(`username`)
);

CREATE TABLE orderRequestItem (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item` VARCHAR(30) NOT NULL,
  `qty` INT DEFAULT 1 NOT NULL,
  `request` VARCHAR(17) NOT NULL,

  CONSTRAINT `orderRequestItem_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `orderRequestItem_id_fk`
    FOREIGN KEY(`request`)
    REFERENCES orderRequest(`id`)
);

CREATE TABLE apparel (
  `id` VARCHAR(17) NOT NULL,
  `type` VARCHAR(30) NOT NULL,
  `size` VARCHAR(10) NOT NULL,
  `color` VARCHAR(20),
  `qty` INT DEFAULT 1 NOT NULL,
  `price` DECIMAL NOT NULL,
  `deliveryDate` TIMESTAMP NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `apparel_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `apparel_employee_fk`
    FOREIGN KEY(`employee`)
    REFERENCES employee(`username`)
);

CREATE TABLE discount (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `rate` INT NOT NULL,
  `isActive` BOOLEAN DEFAULT true NOT NULL,
  `apparel` VARCHAR(17) NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `discount_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `discount_apparel_fk`
    FOREIGN KEY(`apparel`)
    REFERENCES apparel(`id`),
  CONSTRAINT `discount_employee_fk`
    FOREIGN KEY(`employee`)
    REFERENCES employee(`username`)
);

CREATE TABLE sale (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `qty` INT DEFAULT 1 NOT NULL,
  `apparel` VARCHAR(17) NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `sale_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `sale_aparel_pk`
    FOREIGN KEY(`apparel`)
    REFERENCES apparel(`id`),
  CONSTRAINT `sale_employee_fk`
    FOREIGN KEY(`employee`)
    REFERENCES employee(`username`)
);

-- Privileges
GRANT ALL PRIVILEGES ON bluetag.* TO 'bt_master'@'localhost';
GRANT INSERT, SELECT, DELETE ON bluetag.orderRequest TO 'bt_employee'@'localhost';
GRANT INSERT, SELECT, DELETE ON bluetag.orderRequestItem TO 'bt_employee'@'localhost';
GRANT INSERT, SELECT, DELETE ON bluetag.apparel TO 'bt_employee'@'localhost';
GRANT INSERT, SELECT, DELETE ON bluetag.discount TO 'bt_employee'@'localhost';
GRANT INSERT, SELECT, DELETE ON bluetag.sale TO 'bt_employee'@'localhost';

GRANT EXECUTE ON PROCEDURE bluetag.getUser TO 'bt_default'@'localhost';
GRANT EXECUTE ON bluetag.* TO 'bt_employee'@'localhost';
GRANT EXECUTE ON bluetag.* TO 'bt_master'@'localhost';

-- Log
DROP PROCEDURE IF EXISTS log;
DELIMITER $$
CREATE PROCEDURE log (
  IN action VARCHAR(30),
  IN notes TEXT,
  IN employee VARCHAR(10))
BEGIN
  INSERT INTO log VALUES (
    UUID_SHORT(),
    NOW(),
    action,
    notes,
    employee
  );
END;
$$
DELIMITER ;
