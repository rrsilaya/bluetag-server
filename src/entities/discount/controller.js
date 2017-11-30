import db from '../../database/';

export const getDiscountByApparel = ({ apparel }) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        date,
        rate,
        isActive
      FROM discount
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

export const getDiscountById = id => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        date,
        rate,
        isActive,
        apparel
      FROM discount
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

export const addDiscount = (employee, apparel, { rate }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO discount
      VALUES (
        DEFAULT, CURDATE(),
        ?, DEFAULT, ?, ?
      );
    `;

    const values = [rate, apparel, employee];
    db.query(query, values, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      console.log(res);
      return resolve(res.insertId);
    });
  });
};

export const deleteDiscount = (id, employee) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL deleteDiscount(?, ?)
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

export const updateDiscount = (id, employee, { rate, isActive }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL updateDiscount(?, ?, ?, ?)
    `;

    const values = [id, rate, isActive, employee];
    db.query(query, values, (err, res) => {
      res = res[0];

      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0]);
    });
  });
};
