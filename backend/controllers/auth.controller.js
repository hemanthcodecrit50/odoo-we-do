const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { registerSchema, loginSchema } = require('../validation/auth.schema');

const sign = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });

exports.register = asyncHandler(async (req, res) => {
  const data = registerSchema.parse(req.body);
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new ApiError(409, 'Email already registered');
  const user = await User.create(data);
  res.status(201).json({ token: sign(user._id), user: { id: user._id, email: user.email, username: user.username } });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid credentials');
  res.json({ token: sign(user._id), user: { id: user._id, email: user.email, username: user.username } });
});
