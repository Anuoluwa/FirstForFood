import db from '../config/connect';
import PasswordHelper from '../helpers/passwordHelper';
import jwtSign from '../helpers/jwtHelper';
import { createUserAccount, checkUser, findUser } from '../models/query';

/**
* @class AuthController
*/
export default class AuthController {
  /**
 * @method signUp
 * @static
 * @description this takes care of user registration
 * @param {object} req req object
 * @param {object} res res object
 * @returns {Object} Object
 */
  static async signUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const userExists = await db.query(checkUser(username, email));
      if (userExists.rowCount > 0) {
        return res.status(409).json({
          status: 'not successful',
          message: 'user already exists',
        });
      }
      const hashedPassword = await PasswordHelper.hashPassword(password);
      const newUser = { email, username, hashedPassword };
      const createUser = await db.query(createUserAccount(newUser));
      if (createUser.rowCount === 0) {
        return res.status(500).json({
          status: 'oops, something went wrong',
          message: 'Internal Server Error',
        });
      }
      const token = jwtSign({ id: createUser.rows[0].id, email: createUser.rows[0].email },
        process.env.JWT_SECRET, { expiresIn: 86400 });
      const data = {
        token,
        username: createUser.rows[0].username,
        email: createUser.rows[0].email,
      };
      return res.status(201).json({
        status: 'operation successful',
        message: 'User successfully created',
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: `${error}` });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const getUser = await db.query(findUser(username));
      if (getUser.rowCount === 0) {
        return res.status(404).json({
          status: 'not successful',
          message: 'Invalid username or password, they do not exists!',
        });
      }
      const validatePassword = await PasswordHelper
        .verifyPassword(password, getUser.rows[0].password);
      if (validatePassword === false) {
        return res.status(400).json({
          status: 'bad request',
          message: 'password mismatch',
        });
      }
      const token = jwtSign({ id: getUser.rows[0].id, email: getUser.rows[0].email },
        process.env.JWT_SECRET, { expiresIn: 86400 });
      const data = { token, username: getUser.rows[0].username, email: getUser.rows[0].email };
      return res.status(200).json({
        status: 'operation successful',
        message: 'login successful',
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: `${error}` });
    }
  }
}
