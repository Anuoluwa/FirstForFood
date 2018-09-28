
class orderValidator {
  /**
    * Middleware for validation for all users input to order controller .
    * @param {req} str - The req is the receiver of inputs from client.
    * @param {res} str - The res is the carries response to user end from server.
    * @return {res.status()} A response object and emit appropriate errors.
    */
  static validateInput(req, res, next) {
    const { qty, menuId } = req.body;
    if (typeof qty === 'undefined') {
      return res.status(400).json({ message: '"qty" must be not undefined!' });
    }
    if (qty === ' ') {
      return res.status(400).json({ message: '"qty" must not be empty!' });
    }
    if (qty.length > 6) {
      return res.status(400).json(
        { message: '"qty" must be a string of minimum of 6 digits' },
      );
    }
    if (!(/^\d+$/.test(qty))) {
      return res.status(400).json(
        { message: '"qty" must be a string of minimum of 6 digits' },
      );
    }
    if (typeof menuId === 'undefined') {
      return res.status(400).json({ message: '"menuId" must not be undefined!' });
    }
    if (menuId === ' ') {
      return res.status(400).json({ message: '"menuId" must not be empty!' });
    }
    if (menuId.length > 6) {
      return res.status(400).json(
        { message: '"menuId" must be a string of 7 digits' },
      );
    }
    if (!(/^\d+$/.test(menuId))) {
      return res.status(400).json(
        { message: '"menuId" must be a string of numbers, no negative numbers' },
      );
    }
    next();
  }

  static validateId(req, res, next) {
    const { orderId } = req.params;
    if (!Number(orderId)) {
      return res.status(400).json({
        message: 'UserId must be a number',
      });
    }
    next();
  }
}

export default orderValidator;
