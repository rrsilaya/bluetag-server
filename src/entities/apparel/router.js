import { Router } from 'express';
import { countItems } from '../_utils/';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/apparels/:page', async (req, res) => {
  try {
    const { pages } = await countItems('apparel_discount_sale_stock', 10);

    if (req.params.page > pages) {
      res.status(400).json({
        status: 400,
        message: 'Invalid apparel pagination'
      });
    } else {
      const apparel = await Ctrl.getApparel(req.params.page, req.query);

      res.status(200).json({
        status: 200,
        message: 'Successfully fetched apparel',
        data: {
          page: req.query.q ? null : parseInt(req.params.page),
          pages: req.query.q ? null : pages,
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

router.get('/api/apparel/:id', async (req, res) => {
  try {
    const apparel = await Ctrl.getApparelByIdInfo(req.params.id);
    const classification = await Ctrl.getApparelClassification(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched apparel information',
      data: {
        ...apparel,
        classification
      }
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Apparel does not exists';
        break;
      case 500:
        message = 'Internal server error while getting apparel';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.post('/api/apparel', async (req, res) => {
  try {
    const apparel = await Ctrl.addApparel(req.session.user.username, req.body);

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

router.put('/api/apparel/:id', async (req, res) => {
  try {
    const item = await Ctrl.getApparelById(req.params.id);
    const apparel = await Ctrl.editApparel(
      req.session.user.username,
      req.params.id,
      { ...item, ...req.body }
    );

    res.status(200).json({
      status: 200,
      message: 'Successfully updated apparel',
      data: apparel
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Apparel does not exist';
        break;
      case 500:
        message = 'Internal server error while updating apparel';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.delete('/api/apparel/:id', async (req, res) => {
  try {
    await Ctrl.removeApparel(req.params.id, req.session.user.username);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed apparel'
    });
  } catch (status) {
    res.status(status).json({
      status,
      message: 'Internal server error while removing apparel'
    });
  }
});

export default router;
