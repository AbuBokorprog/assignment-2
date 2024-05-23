"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./modules/products/product-route");
const orders_route_1 = require("./modules/orders/orders-route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api/products', product_route_1.productRoutes);
app.use('/api/orders', orders_route_1.orderRouter);
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send(err);
    }
    else {
        res.send('There was an error');
    }
    next();
});
app.use((req, res, next) => {
    res.status(404).send('Route not found');
    next('Route not found');
});
app.get('/', (req, res) => {
    res.send('Home Page');
});
exports.default = app;
