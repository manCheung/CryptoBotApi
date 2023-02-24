import express from 'express';
import config from './../../config/config';

/**
 * Route
 */
import token from './token.route';
import price from './price.route';
import history from './history.route';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`Welcome to : localhost:${config.port}/api`);
});

router.use('/token', token);
router.use('/price', price);
router.use('/history', history);

export default router;
