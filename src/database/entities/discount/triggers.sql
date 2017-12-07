-- On Addition
DROP TRIGGER IF EXISTS newDiscount_log;
DELIMITER $$
CREATE TRIGGER newDiscount_log
AFTER INSERT ON discount
FOR EACH ROW
  BEGIN
    CALL log(
      'add_discount',
      NEW.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;

-- On Delete
DROP TRIGGER IF EXISTS removeDiscount_log;
DELIMITER $$
CREATE TRIGGER removeDiscount_log
BEFORE DELETE ON discount
FOR EACH ROW
  BEGIN
    CALL log(
      'remove_discount',
      OLD.id,
      OLD.employee
    );
  END;
$$
DELIMITER ;

-- On Edit
DROP TRIGGER IF EXISTS editDiscount_log;
DELIMITER $$
CREATE TRIGGER editDiscount_log
AFTER UPDATE ON discount
FOR EACH ROW
  BEGIN
    CALL log(
      'edit_discount',
      OLD.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;
