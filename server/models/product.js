
import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  name: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  
  price: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const product = mongoose.model('product', productSchema);

export default product;