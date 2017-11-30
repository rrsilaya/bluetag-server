import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/stocks/:apparel', async (req, res) => {
  try {
    const stocks = await Ctrl.getStockByApparel(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched stocks',
      data: stocks
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while getting stocks' });
  }
});

router.post('/api/stock', async (req, res) => {
  try {
    const id = await Ctrl.addStock(req.session.user.username, req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully added stock',
      data: { ...req.body, id }
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while adding stock' });
  }
});

router.delete('/api/stock/:id', async (req, res) => {
  try {
    await Ctrl.deleteStock(id, req.session.user.username);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted stock'
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while deleting stock' });
  }
});

router.put('/api/stock/:id', async (req, res) => {
  try {
    const stock = await Ctrl.getStockById(req.params);
    await Ctrl.editStock(req.session.user.username, req.params.id, req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully edited stock',
      data: { ...stock, qty: req.body.qty }
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while editing stock' });
  }
});

export default router;
