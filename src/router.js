import { Router } from 'express';
// Import routers from different entitties
// here. Use `router.use(<router>);`.
import authRouter from './entities/auth/router';

const router = Router();

router.use('/', authRouter);

/* Auth Middleware */
router.use((req, res, next) => {
  if (req.session) {
    return next();
  }

  res.status(401).json({
    status: 401,
    message: 'Must be logged in'
  });
});

export default router;
