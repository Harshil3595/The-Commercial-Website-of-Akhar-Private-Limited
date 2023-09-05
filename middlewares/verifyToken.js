const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ success: false, message: 'No token provided' });
  }

  const tokenValue = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  jwt.verify(tokenValue, 'Harshil', (err, decoded) => {
    if (err) {
      return res.status(403).send({ success: false, message: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
