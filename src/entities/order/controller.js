import db from '../../database';

export const getOrderRequest = page => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        timestamp,
        status,
        company
      FROM orderRequest
      LIMIT ? OFFSET ?
    `;

    const values = [15, 15 * (page - 1)];
    db.query(query, values, (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const getOrderRequestById = id => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        timestamp,
        status,
        company
      FROM orderRequest
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
