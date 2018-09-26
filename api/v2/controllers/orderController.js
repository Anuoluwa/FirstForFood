import db from '../config/connection';
import { checkMenuId } from '../models/query';

class OrderController {
  static async createOrder(req, res) {
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

  static async userOrderHistory(req, res) {
    res.status(200).json({ message: 'order history for users endpoint logic here' });
  }
}

export default OrderController;
