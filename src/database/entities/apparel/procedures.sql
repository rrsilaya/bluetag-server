-- View All Apparel
DROP PROCEDURE IF EXISTS viewAllApparel;
DELIMITER $$
CREATE PROCEDURE viewAllApparel (
  IN limitD INT,
  IN offsetD INT)
BEGIN
  SELECT *
  FROM apparel_discount
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
  SELECT * FROM apparel_discount
  WHERE apparel.id = id;
END;
$$
DELIMITER ;

-- Add Apparel
DROP PROCEDURE IF EXISTS addApparel;
DELIMITER $$
CREATE PROCEDURE addApparel (
  IN id VARCHAR(17),
  IN brand VARCHAR(30),
  IN type VARCHAR(30),
  IN size VARCHAR(10),
  IN color VARCHAR(20),
  IN price DECIMAL,
  IN employee VARCHAR(10))
BEGIN
  INSERT INTO apparel VALUES (
    id, brand, type,
    size, color, price,
    employee
  );
  SELECT
    apparel.id, apparel.brand,
    apparel.type, apparel.size,
    apparel.color, apparel.price
  FROM apparel
  WHERE apparel.id = id;
END;
$$
DELIMITER ;

-- Update Apparel
DROP PROCEDURE IF EXISTS updateApparel;
DELIMITER $$
CREATE PROCEDURE updateApparel (
  IN id VARCHAR(17),
  IN brand VARCHAR(50),
  IN type VARCHAR(30),
  IN size VARCHAR(10),
  IN color VARCHAR(20),
  IN price DECIMAL,
  IN employee VARCHAR(10)
)
BEGIN
  UPDATE apparel
  SET
    apparel.brand = brand, apparel.type = type,
    apparel.size = size, apparel.color = color,
    apparel.price = price, apparel.employee = employee
  WHERE apparel.id = id;
  SELECT
    apparel.id, apparel.brand,
    apparel.type, apparel.size,
    apparel.color, apparel.price
  FROM apparel
  WHERE apparel.id = id;
END;
$$
DELIMITER ;

-- Remove Apparel
DROP PROCEDURE IF EXISTS removeApparel;
DELIMITER $$
CREATE PROCEDURE removeApparel (
  IN id VARCHAR(17),
  IN emp VARCHAR(10))
BEGIN
  UPDATE apparel
  SET employee = emp
  WHERE apparel.id = id;
  DELETE FROM apparel
  WHERE apparel.id = id;
END;
$$
DELIMITER ;
