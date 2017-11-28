import { Router } from 'express';
import * as Ctrl from './controller';
import { countItems } from '../_utils/';

const router = Router();

router.get('/api/logs/:page', async (req, res) => {
  try {
    const { pages } = await countItems('log', 15);

    if (pages < req.params.page) {
      res.status(400).json({
        status: 400,
        message: 'Invalid log pagination'
      });
    } else {
      const logs = await Ctrl.getLogs(req.params.page, req.query);

      res.status(200).json({
        status: 200,
        message: 'Successfully fetched logs',
        data: logs
      });
    }
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while getting logs' });
  }
});

router.get('/api/log/:id', async (req, res) => {
  try {
    const log = await Ctrl.getLogById(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched log',
      data: log
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Log does not exist';
        break;
      case 500:
        message = 'Internal server error while getting log';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.get('/api/logs/employee/:username', async (req, res) => {
  try {
    const logs = await Ctrl.getLogByEmployee(req.params.username);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched logs',
      data: logs
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Logs from employee does not exist';
        break;
      case 500:
        message = 'Internal server error while getting log';
        break;
    }

    res.status(status).json({ status, message });
  }
});

export default router;
