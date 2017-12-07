-- On Addition
DROP TRIGGER IF EXISTS newOrder_log;
DELIMITER $$
CREATE TRIGGER newOrder_log
AFTER INSERT ON orderRequest
FOR EACH ROW
  BEGIN
    CALL log(
      'add_order',
      NEW.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;

-- On Delete
DROP TRIGGER IF EXISTS removeOrder_log;
DELIMITER $$
CREATE TRIGGER removeOrder_log
BEFORE DELETE ON orderRequest
FOR EACH ROW
  BEGIN
    CALL log(
      'remove_order',
      OLD.id,
      OLD.employee
    );
  END;
$$
DELIMITER ;

-- On Edit
DROP TRIGGER IF EXISTS editOrder_log;
DELIMITER $$
CREATE TRIGGER editOrder_log
AFTER UPDATE ON orderRequest
FOR EACH ROW
  BEGIN
    CALL log(
      'edit_order',
      OLD.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;
