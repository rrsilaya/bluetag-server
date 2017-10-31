-- General Table
DROP VIEW IF EXISTS apparel_discount;
CREATE VIEW apparel_discount AS
SELECT
  apparel.id,
  brand,
  type,
  size,
  color,
  qty,
  price,
  IF(
    isActive,
    rate,
    NULL
  ) AS discount,
  IF(
    isActive,
    ROUND((rate / 100) * price, 2),
    price
  ) AS sellingPrice
FROM apparel
LEFT JOIN discount
ON apparel.id = discount.apparel;

-- Discounted Items
DROP VIEW IF EXISTS discountedItem;
CREATE VIEW discountedItem AS
SELECT *
FROM apparel_discount
WHERE discount IS NOT NULL;

-- -- Slow-moving Items
-- DROP VIEW IF EXISTS slowMovingItems;
-- CREATE VIEW slowMovingItems AS
-- SELECT
--   apparel_discount.id,
--   type,
--   size,
--   color,
--   apparel_discount.qty,
--   price,
--   deliveryDate,
--   apparel_discount.employee
-- FROM apparel_discount
-- LEFT JOIN sale
-- ON apparel_discount.id = sale.apparel
-- WHERE
--   sale.id IS NULL AND
--   DATEDIFF(
--     NOW(),
--     deliveryDate
--   ) / 30 > 3;


-- -- Disposal Items
