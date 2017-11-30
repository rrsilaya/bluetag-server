-- On Addition
DROP TRIGGER IF EXISTS newApparel_log;
DELIMITER $$
CREATE TRIGGER newApparel_log
AFTER INSERT ON apparel
FOR EACH ROW
  BEGIN
    CALL log(
      'add_apparel',
      NEW.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;

-- On Delete
DROP TRIGGER IF EXISTS removeApparel_log;
DELIMITER $$
CREATE TRIGGER removeApparel_log
BEFORE DELETE ON stock
FOR EACH ROW
  BEGIN
    CALL log(
      'remove_apparel',
      OLD.apparel,
      OLD.employee
    );
  END;
$$
DELIMITER ;

-- On Edit
DROP TRIGGER IF EXISTS editApparel_log;
DELIMITER $$
CREATE TRIGGER editApparel_log
AFTER UPDATE ON apparel
FOR EACH ROW
  BEGIN
    CALL log(
      'edit_apparel',
      OLD.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;

