/** @function verifyAdmin
/* @param {object} req req object
/* @param {object} res res object
/* @param {object} next res object
/* @returns {Object} res status 404 if user could not be found
/* @returns {Object} status 401 if is a user
*/
const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.admin === 'false' || req.user.admin !== 'true') {
      return res.status(403).json({ message: 'Unauthorized, ACESSS DENIED' });
    }
    if (req.user.admin === 'true') {
      next();
    }
  } catch (error) {
    console.log({ message: `${error}` });
    return res.status(500).json({
      status: 'operation not successful',
      message: 'Oops,...something went wrong on this admin route, try again!',
    });
  }
};

export default verifyAdmin;
