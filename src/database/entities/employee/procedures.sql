-- Create user
DROP PROCEDURE IF EXISTS createUser;
DELIMITER $$
CREATE PROCEDURE createUser (
  IN username VARCHAR(10),
  IN password VARCHAR(24),
  IN type ENUM (
    'manager',
    'employee'
  )
)
BEGIN
  INSERT INTO employee
  VALUES (
    username,
    AES_ENCRYPT(password, 'cHwp1zx2PDrEw'),
    type
  );
END;
$$
DELIMITER ;

-- Get user
DROP PROCEDURE IF EXISTS getUser;
DELIMITER $$
CREATE PROCEDURE getUser (
  IN user VARCHAR(10))
BEGIN
  SELECT username FROM employee
  WHERE username = user;
END;
$$
DELIMITER ;

-- Check credentials
DROP PROCEDURE IF EXISTS checkCredentials;
DELIMITER $$
CREATE PROCEDURE checkCredentials (
  IN user VARCHAR(10),
  IN pass VARCHAR(24)
)
BEGIN
  SELECT username, type
  FROM employee
  WHERE
    username = user
    AND
    pass = AES_DECRYPT(password, 'cHwp1zx2PDrEw');
END;
$$
DELIMITER ;

-- Delete User
DROP PROCEDURE IF EXISTS deleteUser;
DELIMITER $$
CREATE PROCEDURE deleteUser (IN user VARCHAR(10))
BEGIN
  DELETE FROM employee
  WHERE username = user;
END;
$$
DELIMITER ;

