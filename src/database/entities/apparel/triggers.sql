-- On Addition
DROP TRIGGER IF EXISTS newStock_log;
DELIMITER $$
CREATE TRIGGER newStock_log
AFTER INSERT ON stock
FOR EACH ROW
  BEGIN
    CALL log(
      'add_apparel_stock',
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

-- -- On Edit
-- DROP TRIGGER IF EXISTS editApparel_log;
-- DELIMITER $$
-- CREATE TRIGGER editApparel_log
-- AFTER UPDATE ON apparel
-- FOR EACH ROW
--   BEGIN
--     CALL log(
--       'edit_apparel',
--       CONCAT(
--         "Apparel: ",
--         OLD.apparel,
--         "Stock No.: ",
--         OLD.id
--       ),
--       NEW.EMPLOYEE
--     );
--   END;
-- $$
-- DELIMITER ;
