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
    DEFAULT,
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