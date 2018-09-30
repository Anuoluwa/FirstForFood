import jwt from 'jsonwebtoken';
import db from '../config/connection';
import PasswordHelper from '../helpers/passwordHelper';
import { createUserAccount, checkUser, findUser } from '../models/query';

/**
 * Creates a new AuthController.
 * @class
 * @classdesc AuthController has two static methods: signup and login.
 */
export default class AuthController {
  /**
 * @method signUp
 * @static
 * @description this takes care of user registration
 * @constructor none
 * @param {object} req req object
 * @param {object} res res object
 * @returns {Object} status 409 if user already exists with message
 * @returns {Object} status 501 if new user record cannot be implemented with message
 * @returns {Object} status 200 if new user registration is successful with message and users' data
 * @returns {Object} status 500 for server error
 */
  static async signUp(req, res) {
    try {
      const {
        username, email, password, phone, address, admin,
      } = req.body;
      const userExists = await db.query(checkUser(username, email));
      if (userExists.rowCount > 0) {
        return res.status(409).json({
          status: 'not successful',
          message: 'user already exists',
        });
      }
      const hashedPassword = await PasswordHelper.hashPassword(password);
      const newUser = {
        username, email, hashedPassword, phone, address, admin,
      };
      const createUser = await db.query(createUserAccount(newUser));
      if (createUser.rowCount === 0) {
        return res.status(501).json({
          status: 'operation not implemented',
          message: 'user not created',
        });
      }
      const token = jwt.sign(
        {
          id: createUser.rows[0].id,
          email: createUser.rows[0].email,
          admin: createUser.rows[0].admin,
        },
        process.env.SECRET_KEY, { expiresIn: 86400 },
      );
      const data = {
        token,
        username: createUser.rows[0].username,
        email: createUser.rows[0].email,
        phone: createUser.rows[0].phone,
        address: createUser.rows[0].address,
      };
      return res.status(201).json({
        status: 'operation successful',
        message: 'Thank you!, your account was created succcessfully',
        data,
      });
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Oops, something went wrong, try again!',
      });
    }
  }

  /**
 * @method login
 * @static
 * @description this login implementation for returning users
 * @constructor none
 * @param {object} req req object
 * @param {object} res res object
 * @returns {Object} res status 404 if user could not be found with message
 * @returns {Object} status 400 if password is wrong
 * @returns {Object} status 200 for successful login with message and users' data
 * @returns {Object} status 500 for server error
 */
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const getUser = await db.query(findUser(username));
      if (getUser.rowCount === 0) {
        return res.status(404).json({
          status: 'user details not found',
          message: 'Invalid username or password!',
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
      const token = jwt.sign(
        { id: getUser.rows[0].id, email: getUser.rows[0].email, admin: getUser.rows[0].admin },
        process.env.SECRET_KEY, { expiresIn: 86400 },
      );
      const data = {
        token,
        username: getUser.rows[0].username,
        email: getUser.rows[0].email,
        admin: getUser.rows[0].admin,
      };
      return res.status(200).json({
        status: 'operation successful',
        message: 'you are welcome, login successful',
        data,
      });
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Oops, something went wrong, try again!',
      });
    }
  }
}
