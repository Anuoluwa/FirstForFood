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
  static AddOrder(req, res) {
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
  static UpdateOrder(req, res) {
    const orderId = req.params.id;
    const order = orders.filter(order => order.orderId == orderId)[0];
    if (!order) {
      orders.push({
        orderId: orders.length + 1,
        date: req.body.date,
        foodItem: req.body.foodItem,
        quantity: req.body.quantity,
        price: req.body.price,
        address: req.body.address,
      });
      res.status(201).json({ message: 'order was created successfully', data: orders});
    } else {
      const index = orders.indexOf(order);
      const keys = Object.keys(req.body);
      keys.forEach((key) => {
        order[key] = req.body[key];
      });
      orders[index] = order;
      res.status(202).json({ message: 'Order updated successfully!', data: orders[index] });
    }
  }
}