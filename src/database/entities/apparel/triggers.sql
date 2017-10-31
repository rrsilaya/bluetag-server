-- On Addition
DROP TRIGGER IF EXISTS newStock_log;
DELIMITER $$
CREATE TRIGGER newStock_log
AFTER INSERT ON stock
FOR EACH ROW
  BEGIN
    CALL log(
      'add_apparel_stock',
      CONCAT(
        "Apparel: ",
        NEW.apparel,
        "; Stock No.: ",
        NEW.id
      ),
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
      CONCAT(
        "Apparel: ",
        OLD.apparel,
        "Stock No.: ",
        OLD.id
      ),
      OLD.employee
    );
  END;
$$
DELIMITER ;
