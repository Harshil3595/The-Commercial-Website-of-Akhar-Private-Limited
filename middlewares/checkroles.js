const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); // Import the User model

const authorizedRoles = (role) => async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ success: false, message: 'No token provided' });
  }

  const tokenValue = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  try {
    const decoded = jwt.verify(tokenValue, 'Harshil');

    if (!decoded || !decoded.userId) {
      return res.status(403).send({ success: false, message: 'Failed to authenticate token' });
    }


    const user = await User.findById(decoded.userId);

    if (!user || user.role !== role) {
      return res.status(403).send({ success: false, message: 'Unauthorized role' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send({ success: false, message: 'Failed to authenticate token' });
  }
};

module.exports = authorizedRoles;
