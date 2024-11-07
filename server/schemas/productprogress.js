import mongoose from 'mongoose';

const productProgressSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  shipping: { type: String, required: true },
  payment: { type: String, required: true }
}, { timestamps: true });

const ProductProgress = mongoose.model('ProductProgress', productProgressSchema);
export default ProductProgress;
