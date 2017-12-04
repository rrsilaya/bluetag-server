import db from '../../database';

export const getSales = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT
        MONTHNAME(date) AS month,
        YEAR(date) AS year,
        SUM(qty) AS qty
      FROM sale
      GROUP BY
        MONTH(date),
        YEAR(date)
    `;

    db.query(query, (err, rows) => {
      if (err) {
        console.log(err.message);
        return reject(500);
      }

      return resolve(rows);
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
