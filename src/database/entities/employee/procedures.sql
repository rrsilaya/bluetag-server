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