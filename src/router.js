import { Router } from 'express';
// Import routers from different entitties
// here. Use `router.use(<router>);`.
import authRouter from './entities/auth/router';
import employeeRouter from './entities/employee/router';
import apparelRouter from './entities/apparel/router';
import orderRouter from './entities/order/router';
import logRouter from './entities/log/router';

const router = Router();

router.use(authRouter);

/* Auth Middleware */
// router.use((req, res, next) => {
//   if (req.session.user) {
//     return next();
//   }

//   res.status(401).json({
//     status: 401,
//     message: 'Must be logged in'
//   });
// });

router.use(employeeRouter);
router.use(apparelRouter);
router.use(orderRouter);
router.use(logRouter);

export default router;
