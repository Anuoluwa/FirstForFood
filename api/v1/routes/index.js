import express from 'express';
import Order from '../controllers/orderController';

const router = express.Router();

router.get('/', (req, res) => res.json('Successful!, Welcome to SwiftFood API v1!'));
router.get('/orders', Order.GetAllOrders);
router.get('/orders/:id', Order.GetOneOrder);
router.post('/orders', Order.AddOrder);

export default router;
