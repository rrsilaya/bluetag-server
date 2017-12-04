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

router.put('/api/item/:id', async (req, res) => {
  try {
    const item = await Ctrl.getItemById(req.params.id);
    const edited = await Ctrl.editRequestItem(
      req.params.id,
      req.session.user.username,
      req.body
    );

    res.status(200).json({
      status: 200,
      message: 'Successfully edited order item',
      data: edited
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Order item does not exist';
        break;
      case 500:
        message = 'Internal server error while editing order item';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.delete('/api/item/:id', async (req, res) => {
  try {
    await Ctrl.deleteRequestItem(req.params.id, req.session.user.username);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted order item'
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while deleting order item'
      });
  }
});

export default router;
