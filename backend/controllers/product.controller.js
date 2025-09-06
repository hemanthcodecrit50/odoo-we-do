const Product = require('../models/Product');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { productCreateSchema } = require('../validation/product.schema');

exports.list = asyncHandler(async (req, res) => {
  const { q, category, page = 1, limit = 12 } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (q) filter.title = { $regex: q, $options: 'i' };
  const docs = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(docs);
});

exports.getOne = asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) throw new ApiError(404, 'Product not found');
  res.json(p);
});

exports.create = asyncHandler(async (req, res) => {
  const data = productCreateSchema.parse({
    ...req.body,
    price: Number(req.body.price)
  });
  const product = await Product.create({ ...data, seller: req.user.id });
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { productIds: product._id } });
  res.status(201).json(product);
});

exports.update = asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) throw new ApiError(404, 'Product not found');
  if (p.seller.toString() !== req.user.id) throw new ApiError(403, 'Not your listing');
  const fields = ['title','description','category','price','brand','model','material','color','originalPackaging','manualIncluded','status','image'];
  fields.forEach(k => { if (k in req.body) p[k] = k === 'price' ? Number(req.body[k]) : req.body[k]; });
  await p.save();
  res.json(p);
});

exports.remove = asyncHandler(async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) throw new ApiError(404, 'Product not found');
  if (p.seller.toString() !== req.user.id) throw new ApiError(403, 'Not your listing');
  await p.deleteOne();
  res.status(204).end();
});
