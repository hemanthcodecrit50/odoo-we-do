const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

exports.me = asyncHandler(async (req, res) => {
  const u = await User.findById(req.user.id);
  res.json(u);
});

exports.updateMe = asyncHandler(async (req, res) => {
  const { username, bio, avatarUrl } = req.body;
  const u = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { username, bio, avatarUrl } },
    { new: true }
  );
  res.json(u);
});
