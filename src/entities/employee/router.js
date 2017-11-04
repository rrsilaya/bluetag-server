import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/employees/:page', async (req, res) => {
  try {
    const totalUsers = await Ctrl.countUsers();
    const totalPages = Math.ceil(totalUsers / 20);

    if (req.params.page > totalPages) {
      res.status(400).json({
        status: 400,
        message: 'Invalid employee pagination'
      });
    } else {
      const users = await Ctrl.getUsers(req.params);

      res.status(200).json({
        status: 200,
        message: 'Successfully fetched users',
        data: {
          page: parseInt(req.params.page),
          totalPages,
          users
        }
      });
    }
  } catch (status) {
    res
      .status(500)
      .json({ status, message: 'Internal server error on fetching user' });
  }
});

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
