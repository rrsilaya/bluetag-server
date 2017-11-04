import db from '../../database';

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
