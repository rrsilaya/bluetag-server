-- On Addition
DROP TRIGGER IF EXISTS newOrderItem_log;
DELIMITER $$
CREATE TRIGGER newOrderItem_log
AFTER INSERT ON orderRequestItem
FOR EACH ROW
  BEGIN
    CALL log(
      'add_orderItem',
      NEW.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;

-- On Delete
DROP TRIGGER IF EXISTS removeOrderItem_log;
DELIMITER $$
CREATE TRIGGER removeOrderItem_log
BEFORE DELETE ON orderRequestItem
FOR EACH ROW
  BEGIN
    CALL log(
      'remove_orderItem',
      OLD.id,
      OLD.employee
    );
  END;
$$
DELIMITER ;

-- On Edit
DROP TRIGGER IF EXISTS editOrderItem_log;
DELIMITER $$
CREATE TRIGGER editOrderItem_log
AFTER UPDATE ON orderRequestItem
FOR EACH ROW
  BEGIN
    CALL log(
      'edit_orderItem',
      OLD.id,
      NEW.employee
    );
  END;
$$
DELIMITER ;
