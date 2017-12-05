import { Router } from 'express';

import authRouter from './entities/auth/router';
import employeeRouter from './entities/employee/router';
import apparelRouter from './entities/apparel/router';
import orderRouter from './entities/order/router';
import logRouter from './entities/log/router';
import discountRouter from './entities/discount/router';
import saleRouter from './entities/sale/router';
import stockRouter from './entities/stock/router';
import orderItemRouter from './entities/orderRequestItem/router';
import statisticsRouter from './entities/statistics/router';

const router = Router();

router.use(authRouter);

/* Auth Middleware */
router.use((req, res, next) => {
  if (req.session.user) {
    return next();
  }

  res.status(401).json({
    status: 401,
    message: 'Must be logged in'
  });
});

router.use(employeeRouter);
router.use(apparelRouter);
router.use(orderRouter);
router.use(orderItemRouter);
router.use(discountRouter);
router.use(saleRouter);
router.use(stockRouter);
router.use(statisticsRouter);

/* Privilege Middleware */
router.use((req, res, next) => {
  if (req.session.user.type === 'manager') {
    return next();
  }

  res.status(401).json({
    status: 401,
    message: 'You have no correct privilege to access this data'
  });
});

router.use(logRouter);

export default router;
