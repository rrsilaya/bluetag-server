import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/apparels/:page', async (req, res) => {
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
    res
      .status(status)
      .json({ status, message: 'Internal server error while getting apparel' });
  }
});

router.post('/api/apparel', async (req, res) => {
  try {
    const apparel = await Ctrl.addApparel(req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully added apparel',
      data: apparel
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 400:
        message = 'Apparel already exists';
        break;
      case 500:
        message = 'Internal server error while adding apparel';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.delete('/api/apparel/:id', async (req, res) => {
  try {
    await Ctrl.removeApparel(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed apparel'
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while removing apparel'
      });
  }
});

export default router;
