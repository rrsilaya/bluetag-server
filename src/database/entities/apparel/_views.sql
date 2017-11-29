-- Latest Discounts
DROP VIEW IF EXISTS discount_latest;
CREATE VIEW discount_latest AS
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
DROP VIEW IF EXISTS stock_latest;
CREATE VIEW stock_latest AS
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
DROP VIEW IF EXISTS sale_latest;
CREATE VIEW sale_latest AS
SELECT
  apparel,
  SUM(qty) AS sales,
  MAX(date) AS latestSale
FROM sale
GROUP BY apparel;

-- General Table
DROP VIEW IF EXISTS apparel_discount;
CREATE VIEW apparel_discount AS
SELECT
  apparel.*,
  IF(
    isActive,
    rate,
    NULL
  ) AS discount,
  IF(
    isActive,
    ROUND((price - ((rate / 100) * price)), 2),
    price
  ) AS sellingPrice
FROM apparel
LEFT JOIN
  discount_latest AS discount
ON apparel.id = discount.apparel;

-- Apparel Sales
DROP VIEW IF EXISTS apparel_discount_sale;
CREATE VIEW apparel_discount_sale AS
SELECT
  apparel.*,
  sales,
  latestSale
FROM apparel_discount AS apparel
LEFT JOIN sale_latest AS sale
ON apparel.id = sale.apparel;

-- Full Table
DROP VIEW IF EXISTS apparel_discount_sale_stock;
CREATE VIEW apparel_discount_sale_stock AS
SELECT
  apparel.*,
  deliveryDate
FROM apparel_discount_sale AS apparel
LEFT JOIN
  stock_latest AS stock
ON apparel.id = stock.apparel;

-- Discounted Items
DROP VIEW IF EXISTS apparel_discounted;
CREATE VIEW apparel_discounted AS
SELECT *
FROM apparel_discount
WHERE discount IS NOT NULL;

-- Slow-moving Items
DROP VIEW IF EXISTS apparel_slow;
CREATE VIEW apparel_slow AS
SELECT *
FROM apparel_discount_sale_stock AS apparel
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
DROP VIEW IF EXISTS apparel_fast;
CREATE VIEW apparel_fast AS
SELECT *
FROM apparel_discount_sale_stock AS apparel
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
