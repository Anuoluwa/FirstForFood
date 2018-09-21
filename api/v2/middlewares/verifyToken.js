import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'No Token provided',
      });
    }
    const decoded = jwt.verify(token, secret);
    req.userId = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'unauthorized',
      message: 'you are not authorized to perform this operation',
    });
  }
  return null;
};

export default verifyToken;
