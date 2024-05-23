"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product-model");
const createProductService = async (v) => {
    const result = await product_model_1.Products.create(v);
    return result;
};
const readAllProductService = async (v) => {
    if (v) {
        const result = await product_model_1.Products.find(v).select({
            __v: 0,
            'inventory._id': 0,
            'variants._id': 0,
        });
        return result;
    }
    else {
        const result = await product_model_1.Products.find().select({
            __v: 0,
            'inventory._id': 0,
            'variants._id': 0,
        });
        return result;
    }
};
const readSpecificProduct = async (v) => {
    const result = await product_model_1.Products.findById(v).select({
        _id: 0,
        'inventory._id': 0,
        'variants._id': 0,
        __v: 0,
    });
    return result;
};
const updateSpecificProduct = async (v1, v2) => {
    const newQuantity = v2;
    const result = await product_model_1.Products.findByIdAndUpdate(v1, { $inc: { 'inventory.quantity': -newQuantity } }, { new: true }).select({ _id: 0, 'inventory._id': 0, 'variants._id': 0 });
    return result;
};
const deleteSpecificProduct = async (v) => {
    const result = await product_model_1.Products.findOneAndDelete({ _id: v });
    return result;
};
exports.ProductService = {
    createProductService,
    readAllProductService,
    readSpecificProduct,
    updateSpecificProduct,
    deleteSpecificProduct,
};
