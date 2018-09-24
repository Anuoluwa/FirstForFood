class MenuController {
  static async getAllMenu(req, res) {
    res.status(200).json({ message: 'get all menu endpoint logic here' });
  }

  static async getOneMenu(req, res) {
    res.status(200).json({ message: 'get one specific menu endpoint logic here' });
  }

  static async createMenu(req, res) {
    res.status(200).json({ message: 'create menu endpoint logic here' });
  }

  static async updateMenu(req, res) {
    res.status(200).json({ message: 'update menu endpoint logic here' });
  }

  static async deleteMenu(req, res) {
    res.status(200).json({ message: 'delete menu endpoint logic here' });
  }
}

export default MenuController;
