
class orderValidator {
  /**
    * Middleware for validation for all users input to order controller .
    * @param {req} str - The req is the receiver of inputs from client.
    * @param {res} str - The res is the carries response to user end from server.
    * @return {res.status()} A response object and emit appropriate errors.
    */
  static validateInput(req, res, next) {
    const { qty } = req.body;
    if (typeof qty === 'undefined') {
      return res.status(400).json({ message: '"qty" must be not undefined!' });
    }
    if (qty === ' ') {
      return res.status(400).json({ message: '"qty" must not be empty!' });
    }
    if (qty.length < 1) {
      return res.status(400).json(
        { message: '"qty" must be a string with minimum 20 characters' },
      );
    }
    if (qty.length > 7) {
      return res.status(400).json({ message: '"qty" must be a string with maximum 7 characters' });
    }
    next();
  }

  static validateId(req, res, next) {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    if (parsedId.length === '') {
      return res.status(400).json({ message: '"ID" should not be empty!' })
        .end();
    }
    if (Number.isNaN(parsedId) === true) {
      return res.status(400).json({
        message: 'OrderId must be a number',
      });
    }
    next();
  }
}

export default orderValidator;
