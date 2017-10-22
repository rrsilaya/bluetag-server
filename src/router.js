import { Router } from 'express';
// Import routers from different entitties
// here. Use `router.use(<router>);`.

const router = Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

export default router;
