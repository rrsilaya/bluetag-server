-- Add Procedure
DROP PROCEDURE IF EXISTS addStock;
DELIMITER $$
CREATE PROCEDURE addStock (
  IN id VARCHAR(17),
  IN qty INT,
  IN apparel VARCHAR(17),
  IN delivery VARCHAR(17),
  IN employee VARCHAR(10))
BEGIN
  INSERT INTO apparel VALUES (
    id,
    qty,
    NOW(),
    apparel,
    delivery,
    employee
  );
END;
$$
DELIMITER ;
