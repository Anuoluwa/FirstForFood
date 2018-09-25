
class menuValidator {
/**
* Middleware for validation for all users input to menu controller .
* @param {req} str - The req is the receiver of inputs from client.
* @param {res} str - The res is the carries response to user end from server.
* @return {res.status()} A response object and emit appropriate errors.
*/
  static validateInput(req, res, next) {
    const {
      foodName,
      foodDescr,
      price,
    } = req.body;
    if (typeof foodName === 'undefined') {
      return res.status(400).json({ message: '"foodName" must be undefined!' });
    }
    if (foodName === ' ') {
      return res.status(400).json({ message: '"foodName" must not be empty!' });
    }
    if (foodName.length < 8) {
      return res.status(400).json(
        { message: '"foodName" must be a string with minimum 20 characters' },
      );
    }
    if (foodName.length > 30) {
      return res.status(400).json({ message: '"foodName" must be a string with maximum 30 characters' });
    }
    if (typeof foodDescr === 'undefined') {
      return res.status(400).json({ message: '"foodDescr" must not be undefined!' });
    }
    if (foodDescr === ' ') {
      return res.status(400).json({ message: '"foodDescr" must not be empty!' });
    }
    if (!foodDescr) {
      return res.status(400).json({ message: '"foodDescr" must be a string' });
    }
    if (foodDescr.length < 10) {
      return res.status(400).json({ messge: '"foodDescr" must be a string with minimum 20 characters' });
    }
    if (foodDescr.length > 21) {
      return res.status(400).json({ message: '"foodDescr" must be a string with maximum 20 character ' });
    }
    if (typeof price === 'undefined') {
      return res.status(400).json({ message: '"price" must not be undefined!' });
    }
    if (price === ' ') {
      return res.status(400).json({ message: '"price" must not be empty!' });
    }
    if (price.length < 3) {
      return res.status(400).json({ message: '"price" must be a number and minimum of 3 digits' });
    }
    if (price.length > 9) {
      return res.status(400).json({ message: '"price" must be a number and maximum of 3 digits' });
    }
    next();
  }

  static validateId(req, res, next) {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);
    if (id.length === '') {
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

export default menuValidator;
