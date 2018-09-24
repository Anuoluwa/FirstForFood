import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/** @function verifyAdmin
/* @param {object} req req object
/* @param {object} res res object
/* @param {object} next res object
/* @returns {Object} res status 401 if no token is provided
/* @returns {Object} status 501 server error
*/

const secret = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'Unathorized',
        message: 'No Token provided',
      });
    }
    const decoded = jwt.verify(token, secret);
    req.userId = decoded;
    next();
  } catch (error) {
    return res.status(501).json({
      status: 'unauthorized',
      message: 'you are unauthorized for this operation',
    });
  }
  return null;
};

export default verifyToken;
