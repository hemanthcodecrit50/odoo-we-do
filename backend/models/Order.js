import mongoose from 'mongoose';

const orderItemSchema = mongoose.Schema(
  {
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', required: true 
    },
    title: String,
    price: Number,
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    qty: { 
        type: Number, default: 1 
    }
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true },
    items: [orderItemSchema],
    status: { 
        type: String, 
        enum: ['placed', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
    total: { 
        type: Number, 
        required: true 
    }
  },
  { 
    timestamps: true 
}
);

const Order = mongoose.model('order', orderSchema);
module.exports = Order
