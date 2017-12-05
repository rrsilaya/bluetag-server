import { Router } from 'express';
import * as Ctrl from './controller';

import { getApparelById } from '../apparel/controller';
import { getStockById } from '../stock/controller';

const router = Router();

router.get('/api/sales/:apparel', async (req, res) => {
  try {
    const sales = await Ctrl.getSaleByApparel(req.params.apparel);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched sales',
      data: sales
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while fetching sales' });
  }
});

router.post('/api/sale/:apparel', async (req, res) => {
  try {
    const apparel = await getApparelById(req.params.id);
    const stock = await getStockById({ id: req.body.stock });

    if (stock.qty < req.body.qty) {
      res.status(400).json({
        status: 400,
        message: 'Not enough stock'
      });
    }

    const saleId = await Ctrl.addSale(
      req.params.apparel,
      req.session.user.username,
      req.body
    );
    const sale = await Ctrl.getSaleById(saleId);

    res.status(200).json({
      status: 200,
      message: 'Successfully added sale',
      data: sale
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Apparel or stock does not exist';
        break;
      case 500:
        message = 'Internal server error while adding sale';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.delete('/api/sale/:id', async (req, res) => {
  try {
    const sale = await Ctrl.getSaleById(req.params.id);
    await Ctrl.deleteSale(req.params.id, req.session.user.username, sale);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted sale'
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Sale does not exist';
        break;
      case 500:
        message = 'Internal server error while deleting sale';
        break;
    }

    res.status(status).json({ status, message });
  }
});

export default router;
