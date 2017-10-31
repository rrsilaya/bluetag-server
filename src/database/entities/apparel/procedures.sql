-- View All Apparel
DROP PROCEDURE IF EXISTS viewAllApparel;
DELIMITER $$
CREATE PROCEDURE viewAllApparel (
  IN limitD INT,
  IN offsetD INT)
BEGIN
  SELECT * FROM apparel
  LIMIT limitD OFFSET offsetD;
END;
$$
DELIMITER ;

-- View Specific Apparel
DROP PROCEDURE IF EXISTS viewApparel;
DELIMITER $$
CREATE PROCEDURE viewApparel (
  IN id VARCHAR(17))
BEGIN
  SELECT * FROM apparel
  WHERE apparel.id = id;
END;
$$
DELIMITER ;

-- Add Apparel
DROP PROCEDURE IF EXISTS addApparel;
DELIMITER $$
CREATE PROCEDURE addApparel (
  IN type VARCHAR(30),
  IN size VARCHAR(10),
  IN color VARCHAR(20),
  IN qty INT,
  IN price DECIMAL,
  IN employee VARCHAR(10))
BEGIN
  INSERT INTO apparel VALUES (
    UUID_SHORT(),
    type,
    size,
    color,
    qty,
    price,
    NOW(),
    employee
  );
END;
$$
DELIMITER ;

-- Remove Apparel
DROP PROCEDURE IF EXISTS removeApparel;
DELIMITER $$
CREATE PROCEDURE removeApparel (
  IN id VARCHAR(17))
BEGIN
  DELETE FROM apparel
  WHERE apparel.id = id;
END;
$$
DELIMITER ;
