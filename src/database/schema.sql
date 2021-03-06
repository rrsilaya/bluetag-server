-- User
DROP USER IF EXISTS 'bluetag'@'localhost';
CREATE USER 'bluetag'@'localhost' IDENTIFIED BY 'bluetag';

-- Database
DROP DATABASE IF EXISTS bluetag;
CREATE DATABASE bluetag;

USE bluetag;

-- Database Definition
CREATE TABLE employee (
	`username` VARCHAR(10) NOT NULL,
  `password` BLOB NOT NULL,
  `type` ENUM(
    'manager',
    'employee'
  ) DEFAULT 'employee' NOT NULL,

	CONSTRAINT employee_username_pk
    PRIMARY KEY(`username`),
  CONSTRAINT employee_username_uk
    UNIQUE KEY(`username`)
);

CREATE TABLE log (
  `id` VARCHAR(17) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL,
  `action` VARCHAR(30) NOT NULL,
  `affected_id` VARCHAR(17) NOT NULL, -- specifies other details in the action
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `audit_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `audit_employee_fk`
    FOREIGN KEY(`employee`)
    REFERENCES employee(`username`)
    ON DELETE CASCADE
);

CREATE TABLE orderRequest (
  `id` VARCHAR(17),
  `timestamp` TIMESTAMP NOT NULL,
  `status` ENUM(
    'pending',
    'delivered',
    'cancelled'
  ) DEFAULT 'pending' NOT NULL,
  `company` VARCHAR(50) NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `orderRequest_id_pk`
    PRIMARY KEY(`id`)
);

CREATE TABLE orderRequestItem (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item` VARCHAR(30) NOT NULL,
  `qty` INT DEFAULT 1 NOT NULL,
  `request` VARCHAR(17) NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `orderRequestItem_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `orderRequestItem_id_fk`
    FOREIGN KEY(`request`)
    REFERENCES orderRequest(`id`)
    ON DELETE CASCADE
);

CREATE TABLE apparel (
  `id` VARCHAR(17) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `type` VARCHAR(30) NOT NULL,
  `size` VARCHAR(10) NOT NULL,
  `color` VARCHAR(20),
  `price` DECIMAL(10, 2) NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `apparel_id_pk`
    PRIMARY KEY(`id`)
);

CREATE TABLE stock (
  `id` VARCHAR(17) NOT NULL,
  `qty` INT DEFAULT 1 NOT NULL,
  `deliveryDate` TIMESTAMP NOT NULL,
  `apparel` VARCHAR(17) NOT NULL,
  `delivery` VARCHAR(17) NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `stock_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `stock_apparel_fk`
    FOREIGN KEY(`apparel`)
    REFERENCES apparel(`id`)
    ON DELETE CASCADE
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
    REFERENCES apparel(`id`)
    ON DELETE CASCADE
);

CREATE TABLE sale (
  `id` VARCHAR(17) NOT NULL,
  `date` DATE NOT NULL,
  `qty` INT DEFAULT 1 NOT NULL,
  `apparel` VARCHAR(17) NOT NULL,
  `employee` VARCHAR(10) NOT NULL,

  CONSTRAINT `sale_id_pk`
    PRIMARY KEY(`id`),
  CONSTRAINT `sale_aparel_pk`
    FOREIGN KEY(`apparel`)
    REFERENCES apparel(`id`)
    ON DELETE CASCADE
);

-- Privileges
GRANT ALL PRIVILEGES ON bluetag.* TO 'bluetag'@'localhost';
GRANT EXECUTE ON bluetag.* TO 'bluetag'@'localhost';

-- Log
DROP PROCEDURE IF EXISTS log;
DELIMITER $$
CREATE PROCEDURE log (
  IN action VARCHAR(30),
  IN id VARCHAR(17),
  IN employee VARCHAR(10))
BEGIN
  INSERT INTO log VALUES (
    UUID_SHORT(),
    NOW(),
    action,
    id,
    employee
  );
END;
$$
DELIMITER ;
