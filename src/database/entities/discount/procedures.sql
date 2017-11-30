-- Delete Discount
DROP PROCEDURE IF EXISTS deleteDiscount;
DELIMITER $$
CREATE PROCEDURE deleteDiscount (
  IN id INT,
  IN employee VARCHAR(10))
BEGIN
  UPDATE discount
  SET discount.employee = employee
  WHERE discount.id = id;
  DELETE FROM discount
  WHERE discount.id = id;
END;
$$
DELIMITER ;

-- Update Discount
DROP PROCEDURE IF EXISTS updateDiscount;
DELIMITER $$
CREATE PROCEDURE updateDiscount (
  IN id INT,
  IN rate INT,
  IN isActive INT,
  IN employee VARCHAR(10)
)
BEGIN
  UPDATE discount
  SET
    discount.rate = rate,
    discount.isActive = isActive,
    discount.employee = employee
  WHERE discount.id = id;
  SELECT
    discount.id,
    discount.date,
    discount.rate,
    discount.isActive,
    discount.apparel
  FROM discount
  WHERE discount.id = id;
END;
$$
DELIMITER ;
