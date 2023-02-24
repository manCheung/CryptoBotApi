import express from 'express';
import priceCtrl from '../controllers/price.controller';
import { validate } from 'express-validation';

const router = express.Router();

router.route('/')
  .delete(priceCtrl.PriceDelete)
  .get(priceCtrl.PriceGet);

export default router;