import { getOffset } from '../_utils/';
import db from '../../database';

export const getOrderRequest = (
  page,
  { category = 'timestamp', order, filter = '%' }
) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        id,
        timestamp,
        status,
        company
      FROM orderRequest
      ORDER BY ??
      ${order === 'asc' ? 'ASC' : 'DESC'}
      WHERE status LIKE ?
      LIMIT ? OFFSET ?
    `;

    const values = [category, filter, 15, getOffset(15, page)];
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

export const editOrderRequest = (id, employee, { status, company }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL editOrder(?, ?, ?, ?)
    `;

    const values = [id, status, company, employee];
    db.query(query, values, (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0][0]);
    });
  });
};

export const deleteOrderRequest = (id, employee) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL deleteOrder(?, ?)
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
