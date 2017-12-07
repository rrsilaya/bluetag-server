-- Sales
DROP VIEW IF EXISTS statistics_sales;
CREATE VIEW statistics_sales AS
SELECT
  MONTHNAME(date) AS month,
  YEAR(date) AS year,
  SUM(qty) AS sales
FROM sale
GROUP BY
  MONTH(date),
  YEAR(date);

-- Discounts
DROP VIEW IF EXISTS statistics_discounts;
CREATE VIEW statistics_discounts AS
SELECT
  MONTHNAME(date) AS month,
  YEAR(date) AS year,
  COUNT(id) AS discounts
FROM discount
GROUP BY
  MONTH(date),
  YEAR(date);

-- Stats
DROP VIEW IF EXISTS statistics;
CREATE VIEW statistics AS
(
  SELECT
    s.month,
    s.year,
    IFNULL(sales, 0) AS sales,
    IFNULL(discounts, 0) AS discounts
  FROM
    statistics_sales AS s
  LEFT JOIN
    statistics_discounts AS d
  ON
    s.month = d.month
    AND
    s.year = d.year
) UNION (
  SELECT
    d.month,
    d.year,
    IFNULL(sales, 0) AS sales,
    IFNULL(discounts, 0) AS discounts
  FROM
    statistics_sales AS s
  RIGHT JOIN
    statistics_discounts AS d
  ON
    s.month = d.month
    AND
    s.year = d.year
) ORDER BY STR_TO_DATE(CONCAT(month, '-', year), '%M-%Y')
DESC LIMIT 12;
