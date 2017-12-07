DROP PROCEDURE IF EXISTS editOrderItem;
DELIMITER $$
CREATE PROCEDURE editOrderItem (
  IN id INT,
  IN item VARCHAR(30),
  IN qty INT,
  IN employee VARCHAR(10)
)
BEGIN
  UPDATE orderRequestItem
  SET
    orderRequestItem.item = item,
    orderRequestItem.qty = qty,
    orderRequestItem.employee = employee
  WHERE orderRequestItem.id = id;
  SELECT
    orderRequestItem.id,
    orderRequestItem.item,
    orderRequestItem.qty,
    orderRequestItem.request
  FROM orderRequestItem
  WHERE orderRequestItem.id = id;
END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS deleteOrderItem;
DELIMITER $$
CREATE PROCEDURE deleteOrderItem (
  IN id INT,
  IN employee VARCHAR(10)
)
BEGIN
  UPDATE orderRequestItem
  SET orderRequestItem.employee = employee
  WHERE orderRequestItem.id = id;
  DELETE FROM orderRequestItem
  WHERE orderRequestItem.id = id;
END;
$$
DELIMITER ;
