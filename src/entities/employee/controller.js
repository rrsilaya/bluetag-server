import db from '../../database';
import { getOffset } from '../_utils/';

export const getUsers = page => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM employee
      LIMIT ?
      OFFSET ?
    `;

    const values = [20, getOffset(20, page)];
    db.query(query, values, (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const createAccount = ({ username, password, type }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL createAccount(?, ?, ?)
    `;

    const values = [username, password, type];
    db.query(query, values, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return reject(400);
        }
        console.log(err.message);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteAccount = username => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL deleteUser(?)
    `;

    db.query(query, [username], (err, result) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      } else if (!result.affectedRows) {
        return reject(404);
      }

      return resolve();
    });
  });
};
