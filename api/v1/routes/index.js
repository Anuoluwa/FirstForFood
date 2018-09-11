import express from 'express';
import Order from '../controllers/orderController';

const router = express.Router();

router.get('/', (req, res) => res.json('Successful!, Welcome to SwiftFood API v1!'));
router.get('/orders', Order.getAllOrders);
router.get('/orders/:id', Order.getOneOrder);
router.post('/orders', Order.addOrder);
router.put('/orders/:id', Order.updateOrder);
router.delete('/orders/:id', Order.cancelOrder);

export default router;
