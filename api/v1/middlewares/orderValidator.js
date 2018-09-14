class ValidateInput {
  /**
       * Middleware for validation for all users input to question controller .
       * @param {req} str - The req is the receiver of inputs from client.
       * @param {res} str - The res is the carries response to user end from server.
       * @return {res.status()} A response object and emit appropriate errors.
       */

  static orderInput(req, res, next) {
    const {
      foodItem,
      quantity,
      price,
      address,
    } = req.body;
    if (!foodItem) {
      return res.status(400).json({ message: '"foodItem" must be a string!' })
        .end();
    }
    if (foodItem.length < 8) {
      return res.status(400).json(
        { message: '"foodItem" must be a string with minimum 20 characters' },
      )
        .end();
    }
    if (foodItem.length > 30) {
      return res.status(400).json({ message: '"foodItem" must be a string with maximum 200 characters' })
        .end();
    }
    if (!quantity) {
      return res.status(400).json('"quantity" must be a string')
        .end();
    }
    if (quantity.length < 1) {
      return res.status(400).json({ messge: '"quantity" must be a string with minimum 20 characters' })
        .end();
    }
    if (quantity.length > 21) {
      return res.status(400).json({ message: '"quantity" must be a string with maximum 20 character ' })
        .end();
    }
    if (!price) {
      return res.status(400).json({ message: '"price" must be a string!' })
        .end();
    }
    if (price.length < 3) {
      return res.status(400).json({ message: '"price" must be a string with minimum 20 characters ' })
        .end();
    }
    if (price.length > 9) {
      return res.status(400).json({ message: '"price" must be a string with maximum 200 characters' })
        .end();
    }
    if (!address) {
      return res.status(400).json({ message: '"address" must be a string' })
        .end();
    }
    if (address.length < 8) {
      return res.status(400).json({ message: '"address" must be a string with minimum 20 characters' })
        .end();
    }
    if (address.length > 31) {
      return res.status(400).json({ message: '"address" must be a string with maximum 20 character ' })
        .end();
    }
    next();
  }
}
export default ValidateInput;
