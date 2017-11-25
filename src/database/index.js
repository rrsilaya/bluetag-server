import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'bluetag',
  password: 'bluetag',
  db: 'bluetag'
});

db.on('ready', () => console.log('Database is connected')).on('error', err => {
  console.log('Error in connecting to database');
  console.log(err);
});

db.connect(err => {
  if (err) {
    console.log('Error in connecting to database');
    console.log(err.message);
  } else {
    console.log('Success in connecting to database');
  }
});

db.query('USE bluetag');

export default db;
