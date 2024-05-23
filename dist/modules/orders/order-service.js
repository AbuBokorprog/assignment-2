"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const product_model_1 = require("../products/product-model");
const order_model_1 = require("./order-model");
const createOrder = async (v) => {
    const product = await product_model_1.Products.findById(v.productId);
    if (product) {
        if (product?.inventory?.quantity > v?.quantity &&
            product?.inventory?.quantity !== 0) {
            product.inventory.quantity = product.inventory.quantity - v.quantity;
            product.inventory.inStock = true;
            await product.save();
            const data = await order_model_1.Orders.create(v);
            return data;
        }
        else {
            product.inventory.inStock = false;
            const error = 'insufficient stock';
            await product.save();
            return error;
        }
    }
    else {
        const error = 'This Id is invalid';
        return error;
    }
};
const retrieveAllOrder = async (v) => {
    if (v) {
        const result = await order_model_1.Orders.find(v).select({ _id: 0, __v: 0 });
        return result;
    }
    else {
        const result = await order_model_1.Orders.find();
        return result;
    }
};
exports.OrderService = { createOrder, retrieveAllOrder };
