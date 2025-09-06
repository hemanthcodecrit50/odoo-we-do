const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: { 
    type: String, 
    index: true 
    },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: { 
    type: String, 
    enum: ['active', 'sold', 'draft'], 
    default: 'active' },
    brand: String,
    model: String,
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true },
    material: String,
    color: String,
    originalPackaging: { 
        type: Boolean, 
        default: false 
    },
    manualIncluded: { 
        type: Boolean, 
        default: false 
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;