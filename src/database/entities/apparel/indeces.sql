-- ID
CREATE INDEX apparel_id_index
USING BTREE
ON apparel_(id)
ASC;

CREATE INDEX apparelinfo_id_index
USING BTREE
ON apparel_info(id)
ASC;

CREATE INDEX appareldiscount_id_index
USING BTREE
ON apparel_discount(id)
ASC;

-- Delivery Date
CREATE INDEX apparel_deliveryDate_index
USING BTREE
ON stock(deliveryDate)
DESC;
