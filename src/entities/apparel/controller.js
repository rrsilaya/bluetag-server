import db from '../../database';

export const countApparel = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS total
      FROM apparel_info
    `;

    db.query(query, null, (err, result) => {
      if (err) {
        console.log(err.message);
        reject(500);
      }

      return resolve(result[0].total);
    });
  });
};

export const getApparel = page => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM apparel_info
      LIMIT 10
      OFFSET ?
    `;

    const values = [(page - 1) * 10 + 1];

    db.query(query, values, (err, rows) => {
      if (err) {
        console.log(err.message);
        reject(500);
      }

      return resolve(rows);
    });
  });
};

export const getApparelById = id => {
  return new Promise((resolve, reject) => {
    const query = ` 
      SELECT *
      FROM apparel
      WHERE id = ?
    `;

    db.query(query, [id], (err, row) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      if (!row) return reject(404);

      return resolve(row[0]);
    });
  });
};

export const getApparelByIdInfo = id => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM apparel_discount_sale_stock
      WHERE id = ?
    `;

    db.query(query, [id], (err, row) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      if (!row.length) return reject(404);

      return resolve(row[0]);
    });
  });
};

export const addApparel = ({
  id,
  brand,
  type,
  size,
  color,
  qty,
  price,
  timestamp,
  employee
}) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL addApparel(
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?
      );
    `;

    const values = [
      id,
      brand,
      type,
      size,
      color,
      qty,
      price,
      timestamp,
      employee
    ];
    db.query(query, values, (err, result) => {
      if (err) {
        if (err.code === 1062) {
          return reject(400);
        }

        return reject(500);
      }

      return resolve(result);
    });
  });
};

export const editApparel = ({ id, brand, type, size, color, price }) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE apparel
      SET
        brand = ?, type = ?,
        size = ?, color = ?,
        price = ?
      WHERE id = ?
    `;

    const values = [brand, type, size, color, price, id];
    db.query(query, values, (err, row) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(row[0]);
    });
  });
};

export const removeApparel = id => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL removeApparel(?)
    `;

    db.query(query, [id], err => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve();
    });
  });
};
