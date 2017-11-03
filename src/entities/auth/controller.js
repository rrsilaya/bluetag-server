import db from '../../database';

export const login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL getUser(:username)
    `;

    db.query(query, { username }, (err, rows) => {
      rows = rows[0];

      if (err) {
        console.log(err);
        return reject(500);
      } else if (!rows.length) {
        return reject(404); // no existing user
      } else if (rows[0].password !== password) {
        return reject(401);
      }

      return resolve(rows[0]);
    });
  });
};
