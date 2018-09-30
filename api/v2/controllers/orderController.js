import db from '../config/connection';
import {
  checkMenuName, createOrder, findUserById, getUserOrders, getAllOrders, findOrder,
  updateOrder,
} from '../models/query';

class OrderController {
  static async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const {
        qty, menuId,
      } = req.body;
      if (Number.isNaN(userId) === true) {
        return res.status(400).json({
          message: 'OrderId must be a number',
        });
      }
      const userDetails = await db.query(findUserById(userId));
      const menuExists = await db.query(checkMenuName(menuId));

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
      const total = parseInt((menuExists.rows[0].price), 10) * parseInt((newOrder.rows[0].qty), 10);
      if (newOrder.rowCount > 0) {
        const order = {
          id: newOrder.rows[0].id,
          quantity: newOrder.rows[0].qty,
          amount: `${total} NGNnaira`,
          status: newOrder.rows[0].status,
        };
        const customerDetails = {
          name: userDetails.rows[0].username,
          phone: userDetails.rows[0].phone,
          address: userDetails.rows[0].address,
        };
        const menuDetails = {
          name: menuExists.rows[0].foodname,
          phone: menuExists.rows[0].fooddescr,
          address: menuExists.rows[0].price,
        };
        return res.status(201).json({
          status: 'success',
          message: 'Order have been taken!',
          YourDetails: customerDetails,
          menuDetails,
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
      console.log(userOrders);
      const userInfo = await db.query(findUserById(userId));
      if (userOrders.rowCount > 0) {
        return res.status(200).json({
          status: 'operation successful',
          message: 'this is your order history',
          orders: userOrders.rows,
          userDetails: userInfo.rows,
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
    try {
      const getOrders = await db.query(getAllOrders());
      if (getOrders.rowCount === 0) {
        return res.status(404).json({
          status: 'Not found',
          message: 'no order found',
        });
      }
      return res.status(200).json({
        status: 'operation successful',
        message: 'these are the current orders',
        order: getOrders.rows,
      });
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Sorry, something went wrong, in getting all orders try again!',
      });
    }
  }

  static async getOneOrder(req, res) {
    try {
      const { orderId } = req.params;
      const getOrder = await db.query(findOrder(orderId));
      if (getOrder.rowCount === 0) {
        return res.status(404).json({
          status: 'operation not successful',
          message: 'order does not exist',
        });
      }

      if (getOrder.rowCount > 0) {
        const userId = getOrder.rows[0].userid;
        const menuId = getOrder.rows[0].menuid;
        const userInfo = await db.query(findUserById(userId));
        const menuInfo = await db.query(checkMenuName(menuId));
        const order = {
          id: getOrder.rows[0].id,
          quantity: getOrder.rows[0].qty,
          amount: getOrder.rows[0].qty,
          status: getOrder.rows[0].status,
          userId: getOrder.rows[0].userid,
          menuId: getOrder.rows[0].menuid,
        };
        return res.status(200).json({
          status: 'successful',
          message: 'order details',
          order,
          userDetails: userInfo.rows,
          menuIdDetails: menuInfo.rows,
        });
      }
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Sorry, something went wrong, in getting all orders try again!',
      });
    }
  }

  static async updateOrder(req, res) {
    try {
      const { orderId } = req.params;
      // const { status } = req.body;
      const getOrder = await db.query(findOrder(orderId));
      if (getOrder.rowCount === 0) {
        return res.status(404).json({
          status: 'operation not successful',
          message: 'order does not exist',
        });
      }
      const userId = getOrder.rows[0].userid;
      const menuId = getOrder.rows[0].menuid;
      const userInfo = await db.query(findUserById(userId));
      const menuInfo = await db.query(checkMenuName(menuId));
      // const status = getOrder.rows[0].status;
      const updatedOrder = await db.query(updateOrder(getOrder.rows[0].status));
      console.log(menuInfo.rows);
      console.log(updatedOrder.rows);

      if (getOrder.rowCount > 0) {
        const order = {
          id: updatedOrder.rows[0].id,
          quantity: updatedOrder.rows[0].qty,
          amount: updatedOrder.rows[0].amount,
          status: updatedOrder.rows[0].status,
        };
        const userDetails = {
          username: userInfo.rows[0].username,
          email: userInfo.rows[0].email,
          address: userInfo.rows[0].address,
          phone: userInfo.rows[0].phone,
        };
        const menuIdDetails = {
          foodName: menuInfo.rows[0].foodname,
          foodDescr: menuInfo.rows[0].fooddescr,
          price: menuInfo.rows[0].price,
        };
        return res.status(201).json({
          status: 'successful',
          message: 'Order Details',
          order,
          userDetails,
          menuIdDetails,
        });
      }
    } catch (error) {
      console.log({ message: `${error}` });
      return res.status(500).json({
        status: 'operation not successful',
        message: 'Sorry, something went wrong, in getting all orders try again!',
      });
    }
  }

  static async deleteOrder(req, res) {
    res.status(200).json({ message: 'delete order endpoint logic here' });
  }
}

export default OrderController;
