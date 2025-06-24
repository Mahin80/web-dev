const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Authorization header:', authHeader);
  console.log('Token:', token);

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

exports.checkAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
  next();
};

