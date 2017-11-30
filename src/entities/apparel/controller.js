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
      ? classification === 'fast' ? 'apparel_fast' : 'apparel_slow'
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
  employee = 'admin',
  { id, brand, type, size, color, qty, price, timestamp }
) => {
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
        if (err.code === 'ER_DUP_ENTRY') {
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
