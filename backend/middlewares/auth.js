const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')

const protect = (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new ApiError(401, 'Not authorized');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    throw new ApiError(401, 'Invalid/expired token');
  }
}

module.exports = { protect }