import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/apparel/:page', async (req, res) => {
  try {
    const totalApparel = await Ctrl.countApparel();
    const totalPages = Math.ceil(totalApparel / 10);

    if (req.params.page > totalPages) {
      res.status(400).json({
        status: 400,
        message: 'Invalid apparel pagination'
      });
    } else {
      const apparel = await Ctrl.getApparel(req.params.page);

      res.status(200).json({
        status: 200,
        message: 'Successfully fetched apparel',
        data: {
          page: parseInt(req.params.page),
          totalPages,
          apparel
        }
      });
    }
  } catch (status) {
    res.status(status).json({ status, message: 'Internal server error while getting apparel' });
  }
});

export default router;
