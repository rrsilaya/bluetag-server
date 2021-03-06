DROP PROCEDURE IF EXISTS addSale;
DELIMITER $$
CREATE PROCEDURE addSale (
  IN id VARCHAR(17),
  IN qty INT,
  IN apparel VARCHAR(17),
  IN employee VARCHAR(10),
  IN stock_id INT
)
BEGIN
  UPDATE stock
  SET
    stock.qty = stock.qty - qty,
    stock.employee = employee
  WHERE stock.id = stock_id;
  INSERT INTO sale
  VALUES (
    id,
    CURDATE(),
    qty,
    apparel,
    employee
  );
  SELECT
    sale.id,
    sale.date,
    sale.qty,
    sale.apparel
  FROM sale
  WHERE sale.id = id;
END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS deleteSale;
DELIMITER $$
CREATE PROCEDURE deleteSale (
  IN sale_id INT,
  IN qty INT,
  IN employee VARCHAR(10),
  IN stock_id INT
)
BEGIN
  UPDATE stock
  SET
    stock.qty = stock.qty + qty,
    stock.employee = employee
  WHERE stock.id = stock_id;
  UPDATE sale
  SET sale.employee = employee
  WHERE sale.id = sale_id;
  DELETE FROM sale
  WHERE sale.id = sale_id;
END;
$$
DELIMITER ;
