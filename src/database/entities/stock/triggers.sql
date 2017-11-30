-- On Addition
DROP TRIGGER IF EXISTS newStock_log;
DELIMITER $$
CREATE TRIGGER newStock_log
AFTER INSERT ON stock
FOR EACH ROW
  BEGIN
    CALL log(
      'add_stock',
      NEW.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;

-- On Delete
DROP TRIGGER IF EXISTS removeStock_log;
DELIMITER $$
CREATE TRIGGER removeStock_log
BEFORE DELETE ON stock
FOR EACH ROW
  BEGIN
    CALL log(
      'remove_stock',
      OLD.id,
      OLD.employee
    );
  END;
$$
DELIMITER ;

-- On Edit
DROP TRIGGER IF EXISTS editStock_log;
DELIMITER $$
CREATE TRIGGER editStock_log
AFTER UPDATE ON stock
FOR EACH ROW
  BEGIN
    CALL log(
      'edit_stock',
      OLD.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;
