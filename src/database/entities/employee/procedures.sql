-- Get user
DROP PROCEDURE IF EXISTS getUser;
DELIMITER $$
CREATE PROCEDURE getUser (
  IN user VARCHAR(10))
BEGIN
  SELECT * FROM employee
  WHERE username = user;
END;
$$
DELIMITER ;

-- Get user list
DROP PROCEDURE IF EXISTS getUsers;
DELIMITER $$
CREATE PROCEDURE getUsers (
  IN limitD INT,
  IN offsetD INT)
BEGIN
  SELECT username, type FROM employee
  LIMIT limitD OFFSET offsetD;
END;
$$
DELIMITER ;

-- Add User
DROP PROCEDURE IF EXISTS addUser;
DELIMITER $$
CREATE PROCEDURE addUser(
  IN username VARCHAR(10),
  IN password VARCHAR(24),
  IN type ENUM('manager', 'employee'))
BEGIN
  INSERT INTO employee
  VALUES (
    username,
    password,
    type
  );
END;
$$
DELIMITER ;

-- Remove User
DROP PROCEDURE IF EXISTS removeUser;
DELIMITER $$
CREATE PROCEDURE removeUser(
  IN user VARCHAR(10))
BEGIN
  DELETE FROM EMPLOYEE
  WHERE username = user;
END;
$$
DELIMITER ;

GRANT EXECUTE ON PROCEDURE bluetag.getUser TO 'bt_default'@'localhost';