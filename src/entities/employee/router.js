import { Router } from 'express';
import * as Ctrl from './controller';
import { countItems } from '../_utils/';

const router = Router();

router.get('/api/employees/:page', async (req, res) => {
  try {
    const { pages } = await countItems('employee', 20);

    if (req.params.page > pages) {
      res.status(400).json({
        status: 400,
        message: 'Invalid employee pagination'
      });
    } else {
      const users = await Ctrl.getUsers(req.params.page);

      res.status(200).json({
        status: 200,
        message: 'Successfully fetched users',
        data: {
          page: parseInt(req.params.page),
          pages,
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

router.post('/api/employee', async (req, res) => {
  try {
    const user = await Ctrl.createAccount(req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully created account',
      data: user
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

router.delete('/api/employee/:username', async (req, res) => {
  try {
    await Ctrl.deleteAccount(req.params.username);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted account'
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 500:
        message = 'Internal server error on deleting account';
        break;
      case 404:
        message = 'User does not exist';
        break;
    }

    res.status(status).json({ status, message });
  }
});

export default router;
