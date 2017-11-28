import { Router } from 'express';
import * as Ctrl from './controller';
import { countItems } from '../_utils/';

const router = Router();

router.get('/api/orders/:page', async (req, res) => {
  try {
    const { pages } = await countItems('orderRequest', 15);

    if (req.params.page > pages) {
      res.status(400).json({
        status: 400,
        message: 'Invalid order pagination'
      });
    } else {
      const orders = await Ctrl.getOrderRequest(req.params.page, req.query);

      res.status(200).json({
        status: 200,
        message: 'Successfully fetched orders',
        data: {
          orders,
          page: parseInt(req.params.page),
          pages
        }
      });
    }
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while getting orders' });
  }
});

router.get('/api/order/:id', async (req, res) => {
  try {
    const order = await Ctrl.getOrderRequestById(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order item',
      data: order
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Order does not exist';
        break;
      case 500:
        message = 'Internal server error while getting order';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.put('/api/order/:id', async (req, res) => {
  try {
    await Ctrl.editOrderRequest(req.params.id, req.body);
    const edited = await Ctrl.getOrderRequestById(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully edited order',
      data: edited
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while editing order' });
  }
});

export default router;
