import { findById } from '../models/query';
import db from '../config/connection';

/** @function verifyAdmin
/* @param {object} req req object
/* @param {object} res res object
/* @param {object} next res object
/* @returns {Object} res status 404 if user could not be found
/* @returns {Object} status 401 if is a user
*/
const verifyAdmin = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const getUser = await db.query(findById(userId));
    if (getUser.rowCount === 0) {
      return res.status(404).json({
        status: 'user could not found',
        message: 'Invalid username or password!',
      });
    }
    if (getUser.rows[0].username !== 'adminuser') {
      return res.status(403).json({ message: 'User is not authorized to access this endpoint' });
    }
    next();
    return null;
  } catch (error) {
    console.log({ message: `${error}` });
    return res.status(500).json({
      status: 'operation not successful',
      message: 'Oops, something went wrong, try again!',
    });
  }
};

export default verifyAdmin;
