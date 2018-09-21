import express from 'express';
import Auth from '../controllers/authController';


const router = express.Router();
/**
 * @ v2
 * with persistence database
 * welcome message
 */
router.get('/', (req, res) => res.send({ message: 'Successful!, Welcome to SwiftFood API v2!' }));

router.post('/auth/signup', Auth.signUp);
router.post('/auth/login', Auth.login);

export default router;
