import db from '../config/connection';
import { createMenu, checkFoodName, getAllMenu } from '../models/query';

class MenuController {
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
