import mongoose from 'mongoose';
import { Order } from './order-interface';

const OrdersSchema = new mongoose.Schema<Order>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Orders = mongoose.model('Order', OrdersSchema);
