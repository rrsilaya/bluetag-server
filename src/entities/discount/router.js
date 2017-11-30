import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/discounts/:apparel', async (req, res) => {
  try {
    const discounts = await Ctrl.getDiscountByApparel(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched discounts',
      data: discounts.map(d => ({ ...d, isActive: Boolean(d.isActive) }))
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while fetching discount'
      });
  }
});

router.post('/api/discount/:apparel', async (req, res) => {
  try {
    const discount = await Ctrl.addDiscount(
      req.session.user.username,
      req.params.apparel,
      req.body
    );
    const item = await Ctrl.getDiscountById(discount);

    res.status(200).json({
      status: 200,
      message: 'Successfully added discount',
      data: item
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 500:
        message = 'Internal server error while adding discount';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.delete('/api/discount/:id', async (req, res) => {
  try {
    await Ctrl.deleteDiscount(req.params.id, req.session.user.username);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted discount'
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while deleting discount'
      });
  }
});

router.put('/api/discount/:id', async (req, res) => {
  try {
    const discount = await Ctrl.getDiscountById(req.params.id);
    const update = await Ctrl.updateDiscount(
      req.params.id,
      req.session.user.username,
      { ...discount, ...req.body }
    );

    res.status(200).json({
      status: 200,
      message: 'Successfully edited discount',
      data: update
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Discount does not exist';
        break;
      case 500:
        message = 'Internal server error while updating discount';
        break;
    }

    res.status(status).json({ status, message });
  }
});

export default router;
