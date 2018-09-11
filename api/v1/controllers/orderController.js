import orders from '../models/orders';


export default class Orders {
  static async GetAllOrders(req, res) {
    try {
      return await res.json(orders);
    } catch (err) {
      res.status(404).json({ message: 'Order not found!', err });
    }
  }
  static async GetOneOrder(req, res) {
    const orderId = parseInt(req.params.id, 10);
    try {
      const orderItem = await orders.filter(order => order.orderId == orderId)[0];
      if (!orderItem) {
        res.status(404).json({ message: 'Order does not exist!' });
      }
      return res.status(200).json(orderItem);
    } catch (err) {
      res.status(500).json({ message: 'Sorry about that, not available', err });
    }
  }
}