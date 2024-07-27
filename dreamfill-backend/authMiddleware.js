const adminAuthMiddleware = (req, res, next) => {
  console.log('Session:', req.session); // Log session data
  if (req.session.user && req.session.user.username === 'admin') {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated, send 401 Unauthorized
  }
};

const studentAuthMiddleware = (req, res, next) => {
  console.log('Session:', req.session); // Log session data
  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated, send 401 Unauthorized
  }
};

module.exports = { adminAuthMiddleware, studentAuthMiddleware };