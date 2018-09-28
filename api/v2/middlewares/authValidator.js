/**
 * A class to represent validation conditions.
 * @class authValidator
 *
 * @constructor none
 * @static
 * @method gives validation condition to input to auth/signin controller
 * @method gives validation condition to input to auth/login controller
 */

export default class authValidator {
  /**
    * Middleware for validation for all users input to question controller .
    * @param {req} str - The req is the receiver of inputs from client.
    * @param {res} str - The res is the carries response to user end from server.
    * @return {res.status()} A response object and emit appropriate errors.
    */

  static signup(req, res, next) {
    const {
      username, email, password, phone, address, admin,
    } = req.body;
    const validUsername = /^[a-zA-Z\-]+$/.test(username);
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const validPassword = /^[a-zA-Z0-9.\-$@*!]{6,12}$/g.test(password);
    if (req.body === '') {
      return res.status(400)
        .json({ message: 'The request body should not be empty!' });
    }

    if (!validUsername) {
      return res.status(400).json({ message: '"username" should not contain special characters, numbers and whitespace' });
    }
    if (typeof username === 'undefined' || typeof validUsername === 'undefined') {
      return res.status(400)
        .json({ message: '"username" field must not be undefined' });
    }
    if (typeof username !== 'string') {
      return res.status(400)
        .json({ message: '"username" input should be a string' });
    }
    if (username instanceof String) {
      return res.status(400)
        .json({ message: '"username" input should be a string' });
    }
    if (username.length === '') {
      return res.status(400)
        .json({ message: '"username" must not be empty' });
    }
    if (username.length > 10) {
      return res.status(400)
        .json({ message: '"username" must be a string with maximum length of 10' });
    }
    if (username.length < 6) {
      return res.status(400)
        .json({ message: '"username" must be a string with with minimum length of 6' });
    }
    if (typeof email === 'undefined') {
      return res.status(400)
        .json({ message: '"email" field must not be undefined' });
    }
    if (email.length === '') {
      return res.status(400)
        .json({ message: '"email" must be not empty' });
    }
    if (!validEmail) {
      return res.status(400).json({ message: '"email" should be in the proper format' });
    }
    if (typeof password === 'undefined' || typeof validPassword === 'undefined') {
      return res.status(400)
        .json({ message: '"password" field must not be undefined' });
    }
    if (password.length === '') {
      return res.status(400)
        .json({ message: '"password" must be not empty' });
    }
    if (password.length < 6) {
      return res.status(400)
        .json({ message: '"password" must be with minimum length of 6' });
    }
    if (password.length > 13) {
      return res.status(400)
        .json(
          { message: '"password" must be a string with maximum length of 12' },
        );
    }
    if (!validPassword) {
      return res.status(400).json('"password" must be a string of numbers');
    }
    if (typeof phone === 'undefined') {
      return res.status(400)
        .json({ message: '"phone" field must not be empty' });
    }
    if (phone.length === '') {
      return res.status(400)
        .json({ message: '"phone" field must not be empty' });
    }
    if (phone.length !== 11) {
      return res.status(400)
        .json(
          { message: '"phone" must be digits of 11 numbers' },
        );
    }
    if (!(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(phone))) {
      return res.status(400)
        .json({ message: '"phone" must be in the right format' });
    }
    if (typeof address === 'undefined') {
      return res.status(400)
        .json({ message: '"address" must not be undefined' });
    }
    if (address.length === '') {
      return res.status(400)
        .json({ message: '"address" field must not be empty' });
    }
    if (address.length < 10) {
      return res.status(400)
        .json({ message: '"address" must be minimum length of 10' });
    }
    if (address.length > 50) {
      return res.status(400)
        .json({ message: '"address" must be must be maximum length of 50' });
    }
    if (!(/^[#.0-9a-zA-Z\s,-]+$/.test(address))) {
      return res.status(400)
        .json({ message: '"address" must be have a valid characters' });
    }
    next();
  }

  /**
     * Middleware for validation for all users input.
     * @param {req} str - The req is the receiver of inputs from client.
     * @param {res} str - The res is the carries response to user end from server.
     * @return {res.status()} A response object and emit appropriate errors.
     */
  static login(req, res, next) {
    const { username, password } = req.body;
    const validUsername = /^[a-zA-Z\-]+$/.test(username);
    const validPassword = /^[a-zA-Z0-9.\-$@*!]{6,12}$/g.test(password);
    if (!validUsername) {
      return res.status(400).json(
        {
          message: `"username" should not contain special characters,
          numbers and whitespace`,
        },
      );
    }
    if (typeof username === 'undefined' || typeof validUsername === 'undefined') {
      return res.status(400)
        .json({ message: '"username" field must not be undefined' });
    }
    if (username.length === '') {
      return res.status(400)
        .json({ message: '"username" must not be empty' });
    }
    if (username.length > 10) {
      return res.status(400)
        .json({ message: '"username" must be a string with maximum length of 10' });
    }
    if (username.length < 6) {
      return res.status(400)
        .json({ message: '"username" must be a string with with minimum length of 6' });
    }
    if (typeof password === 'undefined' || typeof validPassword === 'undefined') {
      return res.status(400)
        .json({ message: '"password" field must not be undefined' });
    }
    if (password.length === '') {
      return res.status(400)
        .json({ message: '"password" must be not empty' });
    }
    if (password.length < 6) {
      return res.status(400)
        .json({ message: '"password" must be with minimum length of 6' });
    }
    if (password.length > 13) {
      return res.status(400)
        .json({ message: '"password" must be a string with maximum length of 12' });
    }
    if (!validPassword) {
      return res.status(400).json({ message: '"password" must be a string of numbers' });
    }
    next();
  }
}
