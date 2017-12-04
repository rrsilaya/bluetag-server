import db from '../../database';

export const getItemsByRequest = ({ request }) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, item, qty
      FROM orderRequestItem
      WHERE request = ?
    `;

    db.query(query, [request], (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const getItemById = id => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        item,
        qty,
        request
      FROM orderRequestItem
      WHERE id = ?
    `;

    db.query(query, [id], (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      if (!rows.length) reject(404);

      return resolve(rows[0]);
    });
  });
};

export const addRequestItem = (request, employee, { item, qty }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO orderRequestItem
      VALUES (DEFAULT, ?, ?, ?, ?)
    `;

    const values = [item, qty, request, employee];
    db.query(query, values, (err, res) => {
      if (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') return reject(404);

        console.log(err.message);
        return reject(500);
      }

      return resolve(res.insertId);
    });
  });
};

export const editRequestItem = (id, employee, { item, qty }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL editOrderItem(?, ?, ?, ?)
    `;

    const values = [id, item, qty, employee];
    db.query(query, values, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0][0]);
    });
  });
};

export const deleteRequestItem = (id, employee) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL deleteOrderItem(?, ?)
    `;

    const values = [id, employee];
    db.query(query, values, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve();
    });
  });
};
