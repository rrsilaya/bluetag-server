-- Latest Discounts
DROP VIEW IF EXISTS latest_discount;
CREATE VIEW latest_discount AS
SELECT
  id,
  MAX(date) AS date,
  rate,
  isActive,
  apparel,
  employee
FROM discount
GROUP BY apparel;

-- Latest Stock
DROP VIEW IF EXISTS latest_stock;
CREATE VIEW latest_stock AS
SELECT
  id,
  qty,
  MAX(deliveryDate) AS deliveryDate,
  apparel,
  delivery,
  employee
FROM stock
GROUP BY apparel;

-- Latest Sale
DROP VIEW IF EXISTS latest_sale;
CREATE VIEW latest_sale AS
SELECT
  apparel,
  SUM(qty) AS sales,
  MAX(timestamp) AS latestSale
FROM sale
GROUP BY apparel;

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
LEFT JOIN
  latest_discount AS discount
ON apparel.id = discount.apparel;

-- Apparel Sales
DROP VIEW IF EXISTS apparel_sale;
CREATE VIEW apparel_sale AS
SELECT
  apparel.id,
  brand,
  type,
  size,
  color,
  apparel.qty,
  price,
  discount,
  sellingPrice,
  sales,
  latestSale
FROM apparel_discount AS apparel
LEFT JOIN latest_sale AS sale
ON apparel.id = sale.apparel;

-- Full Table
DROP VIEW IF EXISTS apparel_info;
CREATE VIEW apparel_info AS
SELECT
  apparel.id,
  brand,
  type,
  size,
  color,
  apparel.qty,
  price,
  discount,
  sellingPrice,
  deliveryDate,
  sales,
  latestSale
FROM apparel_sale AS apparel
LEFT JOIN
  latest_stock AS stock
ON apparel.id = stock.apparel;

-- Discounted Items
DROP VIEW IF EXISTS discountedItem;
CREATE VIEW discountedItem AS
SELECT *
FROM apparel_discount
WHERE discount IS NOT NULL;

-- Slow-moving Items
DROP VIEW IF EXISTS slowMovingItem;
CREATE VIEW slowMovingItem AS
SELECT *
FROM apparel_info AS apparel
WHERE
  DATEDIFF(
    NOW(),
    deliveryDate
  ) / 30 > 3
AND (
  sales = 0
  OR
  sales IS NULL
);

-- Fast-moving Items
DROP VIEW IF EXISTS fastMovingItem;
CREATE VIEW fastMovingItem AS
SELECT *
FROM apparel_info AS apparel
WHERE
  DATEDIFF(
    NOW(),
    deliveryDate
  ) / 30 <= 3
AND (
  sales != 0
  AND
  sales IS NOT NULL
);
