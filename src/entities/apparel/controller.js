import db from '../../database';

export const countApparel = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS total
      FROM apparel_info
    `;

    db.query(query, null, (err, result) => {
      if (err) {
        console.log(err);
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
        console.log(err);
        reject(500);
      }

      return resolve(rows);
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

export const removeApparel = id => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL removeApparel(?)
    `;

    db.query(query, [id], err => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};
