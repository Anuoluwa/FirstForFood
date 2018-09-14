import orders from '../models/orders';


export default class Orders {
  static async getAllOrders(req, res) {
    try {
      return await res.json(orders);
    } catch (err) {
      return res.status(404).json({ message: 'Orders not found!', err });
    }
  }

  static async getOneOrder(req, res) {
    const orderId = parseInt(req.params.id, 10);
    try {
      const orderItem = await orders.filter(order => order.orderId == orderId)[0];
      if (!orderItem) {
        return res.status(404).json({ message: 'Order does not exist!' });
      }
      return res.status(200).json(orderItem);
    } catch (err) {
      return res.status(500).json({ message: 'Sorry about that, not available', err });
    }
  }

  static addOrder(req, res) {
    const newOrder = {
      orderId: orders.length + 1,
      date: req.body.date,
      foodItem: req.body.foodItem,
      quantity: req.body.quantity,
      price: req.body.price,
      address: req.body.address,
    };
    orders.push(newOrder);
    res.status(201).json({ message: 'order was created successfully', data: orders });
  }

  static async updateOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id, 10);
      const order = await orders.filter(item => item.orderId == orderId)[0];
      if (!order) {
        return res.status(404).json({ message: 'Order does not exist!' });
      }
      const index = orders.indexOf(order);
      const keys = Object.keys(req.body);
      keys.forEach((key) => {
        order[key] = req.body[key];
      });
      orders[index] = order;
      res.status(202).json({ message: 'Order updated successfully!', data: orders[index] });
    } catch (err) {
      res.status(500).json({ message: 'Sorry about that, not available', err });
    }
  }

  static async cancelOrder(req, res) {
    try {
      const orderId = parseInt(req.params.id, 10);
      const order = orders.filter(item => item.orderId == orderId)[0];
      const index = orders.indexOf(order);
      orders.splice(index, 1);
      res.status(200).json({ message: `The is ${orderId} has been removed.` });
    } catch (err) {
      res.status(500).json({ message: 'Sorry about that, not available', err });
    }
  }
}
