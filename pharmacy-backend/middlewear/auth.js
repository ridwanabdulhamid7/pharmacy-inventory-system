const jwt = require('jsonwebtoken');

// Bouncer 1: Are you logged in? (Verifies the Token)
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    // Remove "Bearer " from the token string if it exists
    const cleanToken = token.replace('Bearer ', '');
    const verified = jwt.verify(cleanToken, 'YOUR_SECRET_KEY_123');
    req.user = verified; // Attach user info (id and role) to the request
    next(); // Let them in
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Bouncer 2: Are you allowed in this specific room? (Verifies the Role)
const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    // req.user comes from verifyToken above
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access Denied. You do not have the right permissions.' });
    }
    next(); // Role is correct, let them in
  };
};

module.exports = { verifyToken, verifyRole };