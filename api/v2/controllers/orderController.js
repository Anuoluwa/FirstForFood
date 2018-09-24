class OrderController {
  static async getAllOrder(req, res) {
    res.status(200).json({ message: 'get all order endpoint logic here' });
  }

  static async getOneOrder(req, res) {
    res.status(200).json({ message: 'get one specific order endpoint logic here' });
  }

  static async createOrder(req, res) {
    res.status(200).json({ message: 'create order endpoint logic here' });
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
