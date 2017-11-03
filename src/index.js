import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';

import router from './router';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(
  session({
    key: 'bluetag',
    secret: 'bluetag',
    resave: true,
    saveUninitialized: true,
    checkExpirationInterval: 900000,
    expiration: 86400000
  })
);

app.use(router);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

export default server;
