import express from 'express';
import Order from '../controllers/orderController';
import Validator from '../middlewares/orderValidator';

const router = express.Router();

router.get('/', (req, res) => res.json('Successful!, Welcome to SwiftFood API v1!'));
router.get('/orders', Order.getAllOrders);
router.get('/orders/:id', Validator.validateId, Order.getOneOrder);
router.post('/orders', Validator.orderInput, Order.addOrder);
router.put('/orders/:id', Validator.validateId, Order.updateOrder);
router.delete('/orders/:id', Validator.validateId, Order.cancelOrder);

export default router;
