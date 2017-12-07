import { getOffset } from '../_utils/';
import db from '../../database';

export const getApparel = (
  page,
  { category = 'brand', order, classification, label = 'id', q = '' }
) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM ??
      WHERE ?? LIKE ?
      ORDER BY ??
      ${order === 'desc' ? 'DESC' : 'ASC'}
      LIMIT 10
      OFFSET ?
    `;

    const table = classification
      ? `apparel_${classification}`
      : 'apparel_discount_sale_stock';
    const values = [table, label, `${q}%`, category, getOffset(10, page)];

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

export const addApparel = (
  employee,
  { id, brand, type, size, color, price }
) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL addApparel(?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [id, brand, type, size, color, price, employee];

    db.query(query, values, (err, res) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return reject(400);

        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0][0]);
    });
  });
};

export const editApparel = (
  employee,
  id,
  { brand, type, size, color, price }
) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL updateApparel(?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [id, brand, type, size, color, price, employee];
    db.query(query, values, (err, row) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(row[0][0]);
    });
  });
};

export const removeApparel = (id, employee) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL removeApparel(?, ?)
    `;

    db.query(query, [id, employee], err => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve();
    });
  });
};
