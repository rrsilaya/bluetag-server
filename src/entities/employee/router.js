import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post('/api/employees', async (req, res) => {
  try {
    const username = await Ctrl.createAccount(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created account',
      data: req.body
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error on creating new account';
        break;
      case 400:
        message = 'Username already exists';
        break;
    }

    res.status(status).json({ status, message });
  }
});

export default router;
