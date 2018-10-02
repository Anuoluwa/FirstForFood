import db from '../config/connection';
import { createMenu, checkFoodName, getAllMenu } from '../models/query';

/**
 * Creates a new MenuController.
 * @class
 * @classdesc enuController has two static methods: CreateMenu and getAllMenu.
 */
class MenuController {
  /**
 * @method createMenu
 * @static
 * @description this takes of POST menu method
 * @constructor none
 * @param {object} req req object
 * @param {object} res res object
 * @returns {Object} status 409 if you already created a food with the same name
 * @returns {Object} status 200 Menu created successfully
 * @returns {Object} status 500 for server error
 */
  static async createMenu(req, res) {
    try {
      const userId = req.user.id;
      const {
        foodName, foodDescr, price,
      } = req.body;
      const foodNameExists = await db.query(checkFoodName(foodName, userId));
      if (foodNameExists.rowCount > 0) {
        return res.status(409).json({
          status: 'conflict',
          message: 'you already created a food with the same name',
        });
      }
      const food = {
        foodName, foodDescr, price, userId,
      };
      const addMenu = await db.query(createMenu(food));
      if (addMenu.rowCount > 0) {
        return res.status(201).json({
          status: 'operation successful',
          message: 'Menu created successfully',
          menu: addMenu.rows,
        });
      }
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Sorry, something went wrong, try again!',
      });
    }
  }

  /**
 * @method getAllMenu
 * @static
 * @description this takes of POST menu method
 * @constructor none
 * @param {object} req req object
 * @param {object} res res object
 * @returns {Object} status 200 if menu is empty, Sorry no menu at the moment
 * @returns {Object} status 200 these are the available menu in our restaurant
 * @returns {Object} status 500 Sorry, something went wrong in getting all menu!
 */
  static async getAllMenu(req, res) {
    try {
      const getMenu = await db.query(getAllMenu());
      if (getMenu.rowCount === 0) {
        return res.status(200).json({
          status: 'operation successful',
          message: 'Sorry no menu at the moment',
        });
      }
      return res.status(200).json({
        status: 'operation successful',
        message: 'these are the available menu in our restaurant',
        menu: getMenu.rows,
      });
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Sorry, something went wrong in getting all menu!',
      });
    }
  }

  static async getOneMenu(req, res) {
    res.status(200).json({ message: 'get one specific menu endpoint logic here' });
  }

  static async updateMenu(req, res) {
    res.status(200).json({ message: 'update menu endpoint logic here' });
  }

  static async deleteMenu(req, res) {
    res.status(200).json({ message: 'delete menu endpoint logic here' });
  }
}

export default MenuController;
