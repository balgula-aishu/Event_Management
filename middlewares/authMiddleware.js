const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
//   if (!token) return res.status(401).send('Access denied. No token provided.');
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send('Invalid token.');
//   }
// };

// module.exports = authMiddleware;
// !--------------
const verifyToken = (req, res, next) => {
  const authHeader= req.headers['authorization'];
  // console.log('Received Token:', token)
  // console.log('Authorization Header:', authHeader);
//   if (!token){ return res.status(403).json({ message: 'No token provided' });
// }
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });

  }
const token = authHeader.split(' ')[1]; 

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed',err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded; // Save decoded token data
    // console.log('Decoded Token:', decoded);
    next();
  });
};
module.exports=verifyToken;