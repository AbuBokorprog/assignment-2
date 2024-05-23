import { Products } from '../products/product-model';
import { Order } from './order-interface';
import { Orders } from './order-model';

const createOrder = async (v: Order) => {
  // find product by id
  const product = await Products.findById(v.productId);
  // if have product
  if (product) {
    // if product quantity is greater then order quantity and greater than zeo create order and decrement product quantity
    if (
      product?.inventory?.quantity > v?.quantity &&
      product?.inventory?.quantity !== 0
    ) {
      product.inventory.quantity = product.inventory.quantity - v.quantity;
      product.inventory.inStock = true;
      await product.save();
      const data = await Orders.create(v);
      return data;
    } else {
      // if product quantity zero or less than order quantity give a error and inStock will be false.
      product.inventory.inStock = false;
      const error = 'insufficient stock';
      await product.save();
      return error;
    }
  } else {
    const error = 'This Id is invalid';
    return error;
  }
};

const retrieveAllOrder = async (v?: object) => {
  if (v) {
    const result = await Orders.find(v).select({ _id: 0, __v: 0 });
    return result;
  } else {
    const result = await Orders.find();
    return result;
  }
};

export const OrderService = { createOrder, retrieveAllOrder };
