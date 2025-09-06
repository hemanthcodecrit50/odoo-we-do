const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const ensureCart = async userId =>
  (await Cart.findOne({ user: userId })) || (await Cart.create({ user: userId, items: [] }));

exports.getCart = asyncHandler(async (req, res) => {
  const cart = await ensureCart(req.user.id);
  await cart.populate({ path: 'items.product', select: 'title price image category seller' });
  res.json(cart);
});

exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, qty = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, 'Product not found');
  const cart = await ensureCart(req.user.id);
  const existing = cart.items.find(i => i.product.toString() === productId);
  if (existing) existing.qty += Number(qty);
  else cart.items.push({ product: product._id, seller: product.seller, qty: Number(qty) });
  await cart.save();
  await cart.populate({ path: 'items.product', select: 'title price image category seller' });
  res.status(201).json(cart);
});

exports.updateQty = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;
  const cart = await ensureCart(req.user.id);
  const item = cart.items.find(i => i.product.toString() === productId);
  if (!item) throw new ApiError(404, 'Item not in cart');
  item.qty = Math.max(1, Number(qty));
  await cart.save();
  res.json(cart);
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await ensureCart(req.user.id);
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
});

exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await ensureCart(req.user.id);
  cart.items = [];
  await cart.save();
  res.json(cart);
});
