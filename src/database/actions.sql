-- PROCEDURES
-- log(): Adds items to log.
DROP PROCEDURE IF EXISTS log;
DELIMITER $$
CREATE PROCEDURE log (
  IN action VARCHAR(30),
  IN employee VARCHAR(10))
BEGIN
  INSERT INTO log VALUES (
    UUID_SHORT(),
    NOW(),
    action,
    employee
  );
END;
$$
DELIMITER ;

-- addApparel(): Inserts an apparel to the apparel table.
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

-- TRIGGERS
DELIMITER $$
CREATE TRIGGER log_newApparel
AFTER INSERT ON apparel
FOR EACH ROW
  BEGIN
    log('add_apparel', NEW.employee);
  END;
$$
DELIMITER ;