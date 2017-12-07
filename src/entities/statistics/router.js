import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/statistics', async (req, res) => {
  try {
    const statistics = await Ctrl.getStats();
    const fastMovingItems = await Ctrl.countItems('apparel_fast');
    const slowMovingItems = await Ctrl.countItems('apparel_slow');
    const disposalItems = await Ctrl.countItems('apparel_disposal');
    const discountedItems = await Ctrl.countItems('apparel_discounted');

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched statistics',
      data: {
        statistics,
        fastMovingItems,
        slowMovingItems,
        discountedItems
      }
    });
  } catch (status) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting statistics'
    });
  }
});

export default router;
