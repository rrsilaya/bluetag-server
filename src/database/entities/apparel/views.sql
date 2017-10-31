-- Fast-moving Items
SELECT
  apparel.id,
  type,
  size,
  color,
  apparel.qty,
  price,
  deliveryDate,
  apparel.employee
FROM apparel
LEFT JOIN sale
ON apparel.id = sale.apparel
WHERE
  sale.id IS NOT NULL AND
  DATEDIFF(
    NOW(),
    deliveryDate
  ) / 30 <= 3;

-- Slow-moving Items
DROP VIEW IF EXISTS slowMovingItems;
CREATE VIEW slowMovingItems AS
SELECT
  apparel.id,
  type,
  size,
  color,
  apparel.qty,
  price,
  deliveryDate,
  apparel.employee
FROM apparel
LEFT JOIN sale
ON apparel.id = sale.apparel
WHERE
  sale.id IS NULL AND
  DATEDIFF(
    NOW(),
    deliveryDate
  ) / 30 > 3;

-- Disposal Items
