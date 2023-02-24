import express from 'express';
import historyCtrl from '../controllers/history.controller';
import { ensureToken } from '../helper/TokenValid';
import { validate } from 'express-validation';

const router = express.Router();

router.route('/')
  .post(ensureToken, historyCtrl.historyPost);

export default router;