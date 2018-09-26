import db from '../config/connection';
import {
  checkMenuName, createOrder, findUser, getUserOrders,
} from '../models/query';

class OrderController {
  static async createOrder(req, res) {
    try {
      const userId = req.userId.id;
      const {
        qty, menuId,
      } = req.body;
      if (Number.isNaN(userId) === true) {
        return res.status(400).json({
          message: 'OrderId must be a number',
        });
      }
      const userDetails = await db.query(findUser(userId));
      const menuExists = await db.query(checkMenuName(menuId));
      console.log(menuExists);
      if (menuExists.rowCount === 0) {
        return res.status(404).json({
          status: 'Not found',
          message: 'This food item does not exists!',
        });
      }
      const menu = {
        qty, userId, menuId,
      };
      const newOrder = await db.query(createOrder(menu));
      if (newOrder.rowCount > 0) {
        const order = {
          id: newOrder.rows[0].id,
          quantity: newOrder.rows[0].qty,
          amount: menuExists.price * qty,
          status: newOrder.rows[0].status,
          userId,
          menuId: newOrder.rows[0].menuId,
        };
        return res.status(201).json({
          status: 'success',
          message: 'Order have been taken!',
          YourDetails: userDetails.rows,
          menu: menuExists.rows,
          order,
        });
      }
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Sorry, something went wrong, try to order again!',
      });
    }
  }

  static async userOrderHistory(req, res) {
    try {
      const { userId } = req.params;
      const userOrders = await db.query(getUserOrders(userId));
      if (userOrders.rowCount > 0) {
        return res.status(200).json({
          status: 'operation successful',
          message: 'These are your order history',
          orders: userOrders.rows,
        });
      }
      return res.status(404).json({
        status: 'operation not successful',
        message: 'no order yet',
      });
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Sorry, something went wrong, for order history try again!',
      });
    }
  }

  static async getAllOrder(req, res) {
    res.status(200).json({ message: 'get all order endpoint logic here' });
  }

  static async getOneOrder(req, res) {
    res.status(200).json({ message: 'get one specific order endpoint logic here' });
  }

  static async updateOrder(req, res) {
    res.status(200).json({ message: 'update order endpoint logic here' });
  }

  static async deleteOrder(req, res) {
    res.status(200).json({ message: 'delete order endpoint logic here' });
  }
}

export default OrderController;
