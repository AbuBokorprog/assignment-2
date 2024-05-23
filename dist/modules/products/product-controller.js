"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product-service");
const product_validation_1 = require("./product-validation");
const mongoose_1 = __importDefault(require("mongoose"));
// create product controller
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
// retrieve all products or retrieve search terms controller
const productData = async (req, res) => {
    try {
        const query = product_validation_1.searchQuerySchema.parse(req.query);
        let searchQuery = {};
        // if searchTerm query have then retrieve products by searchTerm
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
            // if data is greater than zero retrieve products by searchTerm
            if (data.length > 0) {
                res.status(200).json({
                    success: true,
                    message: `Products matching search term '${query?.searchTerm}' fetched successfully!`,
                    data,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: `Products matching search term '${query?.searchTerm}' not found`,
                });
            }
        }
        else {
            // Retrieve all products
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
// Retrieve specific product controller
const specificProductData = async (req, res) => {
    const { productId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(500).json({ success: false, message: 'Invalid product ID' });
        }
        const data = await product_service_1.ProductService.readSpecificProduct(productId);
        if (!data?.name) {
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
// update specific product controller
const updateSpecificProduct = async (req, res) => {
    const id = req.params.productId;
    const { updateData } = req.body;
    try {
        // check id validate or not
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.productId)) {
            res.status(500).json({ success: false, message: 'Invalid product ID' });
        }
        const data = await product_service_1.ProductService.updateSpecificProduct(id, updateData);
        if (!data?.name) {
            res.status(200).json({
                success: true,
                message: 'Product not found!',
            });
        }
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
// delete specific product controller
const deleteSpecificProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        // check id validate or not
        if (!mongoose_1.default.Types.ObjectId.isValid(req.params.productId)) {
            res.status(500).json({ success: false, message: 'Invalid product ID' });
        }
        let data = await product_service_1.ProductService.deleteSpecificProduct(productId);
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
                message: 'The product not found!',
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
