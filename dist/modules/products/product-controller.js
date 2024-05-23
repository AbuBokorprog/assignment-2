"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product-service");
const product_validation_1 = require("./product-validation");
const mongoose_1 = __importDefault(require("mongoose"));
const productCreate = async (req, res) => {
    try {
        const product = req.body;
        const productZodSchema = product_validation_1.ProductSchema.parse(product);
        const data = await product_service_1.ProductService.createProductService(productZodSchema);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error,
        });
    }
};
const productData = async (req, res) => {
    try {
        const query = product_validation_1.searchQuerySchema.parse(req.query);
        let searchQuery = {};
        if (query?.searchTerm) {
            searchQuery = {
                $or: [
                    { name: { $regex: query?.searchTerm, $options: 'i' } },
                    { description: { $regex: query?.searchTerm, $options: 'i' } },
                    { category: { $regex: query?.searchTerm, $options: 'i' } },
                    { tags: { $regex: query?.searchTerm, $options: 'i' } },
                ],
            };
            const data = await product_service_1.ProductService.readAllProductService(searchQuery);
            if (data.length > 0) {
                res.status(200).json({
                    success: true,
                    message: `Products matching search term ${query?.searchTerm} fetched successfully!`,
                    data,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: `Products matching search term ${query?.searchTerm} not found`,
                });
            }
        }
        else {
            const data = await product_service_1.ProductService.readAllProductService();
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
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
const specificProductData = async (req, res) => {
    const { productId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(500).json({ success: false, message: 'Invalid product ID' });
        }
        const data = await product_service_1.ProductService.readSpecificProduct(productId);
        if (!data) {
            res.status(404).json({
                success: false,
                message: 'Product not found!',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error,
        });
    }
};
const updateSpecificProduct = async (req, res) => {
    const id = req.params.productId;
    const { updateData } = req.body;
    const data = await product_service_1.ProductService.updateSpecificProduct(id, updateData);
    try {
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error,
        });
    }
};
const deleteSpecificProduct = async (req, res) => {
    const { productId } = req.params;
    let data = await product_service_1.ProductService.deleteSpecificProduct(productId);
    try {
        if (data) {
            data = null;
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully!',
                data,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "The product couldn't find ",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error,
        });
    }
};
exports.productController = {
    productCreate,
    productData,
    specificProductData,
    updateSpecificProduct,
    deleteSpecificProduct,
};
