-- On Addition
DROP TRIGGER IF EXISTS newSale_log;
DELIMITER $$
CREATE TRIGGER newSale_log
AFTER INSERT ON sale
FOR EACH ROW
  BEGIN
    CALL log(
      'add_sale',
      NEW.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;

-- On Delete
DROP TRIGGER IF EXISTS removeSale_log;
DELIMITER $$
CREATE TRIGGER removeSale_log
BEFORE DELETE ON sale
FOR EACH ROW
  BEGIN
    CALL log(
      'remove_sale',
      OLD.id,
      OLD.employee
    );
  END;
$$
DELIMITER ;

-- On Edit
DROP TRIGGER IF EXISTS editSale_log;
DELIMITER $$
CREATE TRIGGER editSale_log
AFTER UPDATE ON sale
FOR EACH ROW
  BEGIN
    CALL log(
      'edit_sale',
      OLD.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;
