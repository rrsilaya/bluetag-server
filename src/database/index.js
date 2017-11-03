import MariaSQL from 'mariasql';

const db = new MariaSQL({
  host: 'localhost',
  user: 'bt_default',
  password: 'default',
  db: 'bluetag'
});

db.on('ready', () => console.log('Database is connected')).on('error', err => {
  console.log('Error in connecting to database');
  console.log(err);
});

db.query('USE bluetag');

export default db;
