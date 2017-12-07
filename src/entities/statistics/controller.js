import db from '../../database';

export const getStats = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM statistics
    `;

    db.query(query, (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(rows.reverse());
    });
  });
};

export const countItems = table => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS total
      FROM ??
    `;

    db.query(query, [table], (err, res) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(res[0].total);
    });
  });
};
