import express from 'express';
import Auth from '../controllers/authController';
import authValidation from '../middlewares/authValidator';
import Order from '../controllers/orderController';
import Menu from '../controllers/menuController';
import verifyToken from '../middlewares/verifyToken';
import verifyAdmin from '../middlewares/verifyAdmin';
import MenuValidator from '../middlewares/menuValidator';
// import orderValidator from '../middlewares/orderValidator';

const router = express.Router();

router.get('/', (req, res) => res.send({ message: 'Successful!, Welcome to SwiftFood API v2!' }));

router.post('/auth/signup', authValidation.signup, Auth.signUp);
router.post('/auth/login', authValidation.login, Auth.login);

router.get('/orders', verifyToken, verifyAdmin, Order.getAllOrder);
router.get('/orders/:orderId', verifyToken, verifyAdmin, Order.getOneOrder);
router.post('/orders', verifyToken, Order.createOrder);
router.get('/users/:userId/orders', verifyToken, Order.userOrderHistory);
router.put('/orders/:orderId', verifyToken, verifyAdmin, Order.updateOrder);
router.delete('/orders/:orderId', verifyToken, Order.deleteOrder);


router.get('/menu', Menu.getAllMenu);
router.get('/menu/:menuId', Menu.getOneMenu);
router.post('/menu', verifyToken, verifyAdmin, MenuValidator.validateInput, Menu.createMenu);
router.put('/menu/:menuId', verifyToken, Menu.updateMenu);
router.delete('/menu/:menuId', verifyToken, Menu.deleteMenu);

export default router;
