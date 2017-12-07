import db from '../../database';

export const getSaleByApparel = apparel => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id, date,
        qty
      FROM sale
      WHERE apparel = ?
    `;

    db.query(query, [apparel], (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const getSaleById = id => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, date, qty
      FROM sale
      WHERE id = ?
    `;

    db.query(query, [id], (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0]);
    });
  });
};

export const addSale = (apparel, employee, { qty, stock }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL addSale(UUID_SHORT(), ?, ?, ?, ?)
    `;

    const values = [qty, apparel, employee, stock];
    db.query(query, values, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res.insertId);
    });
  });
};

export const deleteSale = (id, employee, { qty, stock }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL deleteSale(?, ?, ?, ?)
    `;

    const values = [id, qty, employee, stock];
    db.query(query, values, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve();
    });
  });
};
