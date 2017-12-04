import db from '../../database';

export const checkUser = username => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL getUser(?)
    `;

    db.query(query, [username], (err, res) => {
      res = res[0];

      if (err) {
        console.log(err.message);
        return reject(500);
      }

      if (!res.length) return reject(404);

      return resolve();
    });
  });
};

export const login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    const query = `
      CALL checkCredentials(?, ?)
    `;

    const values = [username, password];
    db.query(query, values, (err, res) => {
      res = res[0];

      if (err) {
        console.log(err.message);
        return reject(500);
      }

      if (!res.length) return reject(401);

      return resolve(res[0]);
    });
  });
};
