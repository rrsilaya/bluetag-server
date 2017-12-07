import db from '../../database/';

export const getStockById = ({ id }) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id, qty, deliveryDate,
        apparel, delivery
      FROM stock
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

export const getStockByApparel = ({ apparel }) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id, qty,
        deliveryDate, delivery
      FROM stock
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

export const addStock = (employee, { qty, apparel, delivery }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL addStock(UUID_SHORT(), ?, ?, ?, ?)
    `;

    const values = [qty, apparel, delivery, employee];
    db.query(query, values, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0][0]);
    });
  });
};

export const deleteStock = (id, employee) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL deleteStock(?, ?)
    `;

    db.query(query, [id, employee], (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const editStock = (employee, id, { qty }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL editStock(?, ?, ?)
    `;

    db.query(query, [id, qty, employee], (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0][0]);
    });
  });
};
