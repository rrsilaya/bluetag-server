DROP PROCEDURE IF EXISTS editOrder;
DELIMITER $$
CREATE PROCEDURE editOrder (
  IN id VARCHAR(17),
  IN status ENUM('pending', 'delivered, cancelled'),
  IN company VARCHAR(50),
  IN employee VARCHAR(10)
)
BEGIN
  UPDATE orderRequest
  SET
    orderRequest.status = status,
    orderRequest.company = company,
    orderRequest.employee = employee
  WHERE orderRequest.id = id;
END;
$$
DELIMITER ;

DROP PROCEDURE IF EXISTS deleteOrder;
DELIMITER $$
CREATE PROCEDURE deleteOrder (
  IN id VARCHAR(17),
  IN employee VARCHAR(10)
)
BEGIN
  UPDATE orderRequest
  SET orderRequest.employee = employee
  WHERE orderRequest.id = id;
  DELETE FROM orderRequest
  WHERE orderRequest.id = id;
END;
$$
DELIMITER ;
