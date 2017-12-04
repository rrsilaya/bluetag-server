import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/items/:request', async (req, res) => {
  try {
    const items = await Ctrl.getItemsByRequest(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched items',
      data: items
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while fetching items' });
  }
});

router.post('/api/item/:request', async (req, res) => {
  try {
    const id = await Ctrl.addRequestItem(
      req.params.request,
      req.session.user.username,
      req.body
    );
    const item = await Ctrl.getItemById(id);

    res.status(200).json({
      status: 200,
      message: 'Successfully added order item',
      data: item
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Order request does not exist';
        break;
      case 500:
        message = 'Internal server error while adding order item';
        break;
    }

    res.status(status).json({ status, message });
  }
});

export default router;
