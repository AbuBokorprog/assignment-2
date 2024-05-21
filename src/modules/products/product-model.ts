import mongoose from 'mongoose';
import { Inventory, Product, Variants } from './product.interface';

const Variants = new mongoose.Schema<Variants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Inventory = new mongoose.Schema<Inventory>({
  quantity: Number,
  inStock: Boolean,
});

const productSchema = new mongoose.Schema<Product>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [Variants],
    required: true,
  },
  inventory: Inventory,
});

const Products = mongoose.model<Product>('Product', productSchema);

export { Products };
