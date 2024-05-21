import mongoose from 'mongoose';
import { array } from 'zod';

const Variants = [
  {
    type: {
      type: String,
    },
    value: {
      type: String,
    },
  },
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: String,
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  tags: {
    type: array,
  },
  variants: Variants,
  inventory: {
    quantity: {
      type: Number,
    },
    inStock: {
      type: String,
    },
  },
});

const Product = mongoose.model('Product', productSchema);

export { Product };
