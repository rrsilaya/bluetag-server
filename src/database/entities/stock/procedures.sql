-- Add Stock
DROP PROCEDURE IF EXISTS addStock;
DELIMITER $$
CREATE PROCEDURE addStock (
  IN id VARCHAR(17),
  IN qty INT,
  IN apparel VARCHAR(17),
  IN delivery VARCHAR(17),
  IN employee VARCHAR(10))
BEGIN
  INSERT INTO stock VALUES (
    id,
    qty,
    NOW(),
    apparel,
    delivery,
    employee
  );
  SELECT
    stock.id, stock.qty,
    stock.deliveryDate, stock.apparel,
    stock.delivery
  FROM stock
  WHERE stock.id = id;
END;
$$
DELIMITER ;

-- Edit Stock
DROP PROCEDURE IF EXISTS editStock;
DELIMITER $$
CREATE PROCEDURE editStock (
  IN stock_id VARCHAR(17),
  IN num INT,
  IN emp VARCHAR(10)
)
BEGIN
  UPDATE stock
  SET
    qty = num,
    employee = emp
  WHERE id = stock_id;
  SELECT
    stock.id, stock.qty,
    stock.deliveryDate, stock.apparel,
    stock.delivery
  FROM stock
  WHERE stock.id = stock_id;
END;
$$
DELIMITER ;

-- Delete Stock
DROP PROCEDURE IF EXISTS deleteStock;
DELIMITER $$
CREATE PROCEDURE deleteStock (
  IN stock_id VARCHAR(17),
  IN emp VARCHAR(10))
BEGIN
  UPDATE stock
  SET employee = emp
  WHERE id = stock_id;
  DELETE FROM stock
  WHERE id = stock_id;
END;
$$
DELIMITER ;
