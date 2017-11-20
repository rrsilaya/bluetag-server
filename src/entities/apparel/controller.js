import db from '../../database';

export const countApparel = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*) AS total
      FROM apparel_info
    `;

    db.query(query, null, (err, result) => {
      if (err) {
        console.log(err);
        reject(500);
      }

      return resolve(result[0].total);
    });
  });
};

export const getApparel = page => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM apparel_info
      LIMIT 10
      OFFSET :offset
    `;

    db.query(query, { offset: ((page - 1) * 10) + 1 }, (err, rows) => {
      if (err) {
        console.log(err);
        reject(500);
      }

      return resolve(rows);
    });
  });
};
