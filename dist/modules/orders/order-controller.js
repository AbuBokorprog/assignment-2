"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order-service");
const orders_validation_1 = require("./orders-validation");
const createOrder = async (req, res) => {
    const orderData = req.body;
    const order = orders_validation_1.OrderZodSchema.parse(orderData);
    const data = await order_service_1.OrderService.createOrder(order);
    try {
        // if error like invalid id or insufficient stock
        if (typeof data == 'string') {
            res.status(200).json({
                success: false,
                message: data,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data,
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
};
const retrieveAllOrder = async (req, res) => {
    const query = orders_validation_1.byEmail.parse(req?.query);
    try {
        let emailQuery = {};
        // if query email have get user orders
        if (query?.email) {
            emailQuery = {
                email: { $regex: query.email, $options: 'i' },
            };
            const data = await order_service_1.OrderService.retrieveAllOrder(emailQuery);
            // if there is no data like empty array
            if (data.length == 0) {
                res.status(500).json({
                    success: false,
                    message: 'There is no orders for user email!',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data,
            });
        }
        else {
            // work for retrieve all orders
            const data = await order_service_1.OrderService.retrieveAllOrder();
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data,
            });
        }
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
        });
    }
};
exports.OrderController = {
    createOrder,
    retrieveAllOrder,
};
