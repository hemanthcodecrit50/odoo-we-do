import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

export const checkoutFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) throw new ApiError(400, 'Cart is empty');
  const items = cart.items.map(i => ({
    product: i.product._id,
    title: i.product.title,
    price: i.product.price,
    seller: i.product.seller,
    qty: i.qty
  }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const order = await Order.create({ user: req.user.id, items, total, status: 'placed' });

  // mark products as sold (single-quantity assumption)
  await Product.updateMany(
    { _id: { $in: items.map(i => i.product) } },
    { $set: { status: 'sold' } }
  );

  cart.items = [];
  await cart.save();
  res.status(201).json(order);
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});
