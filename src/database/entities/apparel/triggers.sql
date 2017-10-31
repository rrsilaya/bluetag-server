-- On Addition
DROP TRIGGER IF EXISTS newApparel_log;
DELIMITER $$
CREATE TRIGGER newApparel_log
AFTER INSERT ON apparel
FOR EACH ROW
  BEGIN
    CALL log(
      'add_apparel',
      CONCAT(
        "Apparel: ",
        NEW.id
      ),
      NEW.employee
    );
  END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS removeApparel_log;
DELIMITER $$
CREATE TRIGGER removeApparel_log
BEFORE DELETE ON apparel
FOR EACH ROW
  BEGIN
    CALL log(
      'remove_apparel',
      CONCAT(
        "Employee: ",
        OLD.id
      ),
      OLD.employee
    );
  END;
$$
DELIMITER ;
