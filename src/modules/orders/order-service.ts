import { Order } from './order-interface';
import { Orders } from './order-model';

const createOrder = async (v: Order) => {
  const result = await Orders.create(v);
  return result;
};

const retrieveAllOrder = async (v?: object) => {
  const result = await Orders.find().select({ _id: 0, __v: 0 });
  return result;
};

export const OrderService = { createOrder, retrieveAllOrder };
