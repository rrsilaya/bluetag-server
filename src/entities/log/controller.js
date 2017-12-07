import db from '../../database';
import { getOffset } from '../_utils/';

export const getLogs = (
  page,
  { category = 'timestamp', order, date, employee = '' }
) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM log
      WHERE
        timestamp < ADDDATE(?, 1)
        AND
        employee LIKE ?
      ORDER BY ??
      ${order === 'asc' ? 'ASC' : 'DESC'}
      LIMIT 15 OFFSET ?
    `;

    const CURDATE = { toSqlString: () => 'CURDATE()' };

    const values = [
      date || CURDATE,
      `${employee}%`,
      category,
      getOffset(15, page)
    ];
    console.log(values);
    db.query(query, values, (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const getLogById = id => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM log
      WHERE id = ?
    `;

    db.query(query, [id], (err, row) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      if (!row.length[0]) return reject(404);

      return resolve(row[0]);
    });
  });
};
