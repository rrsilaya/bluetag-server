import db from '../../database';

export const countUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS total
      FROM employee
    `;

    db.query(query, null, (err, result) => {
      return resolve(result[0].total);
    });
  });
};

export const getUsers = ({ page }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL getUsers(:limit, :offset)
    `;

    db.query(query, { limit: 20, offset: 20 * (page - 1) }, (err, rows) => {
      rows = rows[0];

      if (err) {
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const createAccount = ({ username, password, type }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL addUser(
        :username,
        :password,
        :type
      )
    `;

    db.query(query, { username, password, type }, (err, result) => {
      if (err) {
        if (err.code === 1062) {
          return reject(400);
        }
        return reject(500);
      }

      return resolve();
    });
  });
};

export const deleteAccount = ({ username }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL removeUser(:username)
    `;

    db.query(query, { username }, (err, result) => {
      if (err) {
        console.log(err);
        return reject(500);
      } else if (!result.info.affectedRows) {
        return reject(404);
      }

      return resolve();
    });
  });
};
