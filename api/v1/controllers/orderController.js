import questions from '../models/orders';


export default class Orders {
  static async GetAllOrders(req, res) {
    try {
      return await res.json(questions);
    } catch (err) {
      res.status(404).json({ message: 'Question not found!', err });
    }
  }
}