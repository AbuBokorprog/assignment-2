import { Request, Response } from 'express';
import { ProductService } from './product-service';
import { ProductSchema, searchQuerySchema } from './product-validation';
import mongoose from 'mongoose';

// create product controller
const productCreate = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const productZodSchema = ProductSchema.parse(product);
    const data = await ProductService.createProductService(productZodSchema);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data,
    });
  } catch (error: unknown) {
    res.status(404).json({
      success: false,
      message: error as string,
    });
  }
};

// retrieve all products or retrieve search terms controller
const productData = async (req: Request, res: Response) => {
  try {
    const query = searchQuerySchema.parse(req.query);

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
      const data = await ProductService.readAllProductService(searchQuery);
      // if data is greater than zero retrieve products by searchTerm
      if (data.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${query?.searchTerm}' fetched successfully!`,
          data,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Products matching search term '${query?.searchTerm}' not found`,
        });
      }
    } else {
      // Retrieve all products
      const data = await ProductService.readAllProductService();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data,
      });
    }
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: error as string,
    });
  }
};

// Retrieve specific product controller
const specificProductData = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(500).json({ success: false, message: 'Invalid product ID' });
    }
    const data = await ProductService.readSpecificProduct(productId);
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
  } catch (error: unknown) {
    res.status(404).json({
      success: false,
      message: error as string,
    });
  }
};

// update specific product controller
const updateSpecificProduct = async (req: Request, res: Response) => {
  const id = req.params.productId;
  const { updateData } = req.body;

  try {
    // check id validate or not
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      res.status(500).json({ success: false, message: 'Invalid product ID' });
    }
    const data = await ProductService.updateSpecificProduct(id, updateData);
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
  } catch (error: unknown) {
    res.status(404).json({
      success: false,
      message: error as string,
    });
  }
};

// delete specific product controller
const deleteSpecificProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    // check id validate or not
    if (!mongoose.Types.ObjectId.isValid(req.params.productId)) {
      res.status(500).json({ success: false, message: 'Invalid product ID' });
    }
    let data = await ProductService.deleteSpecificProduct(productId);
    if (data) {
      data = null;
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'The product not found!',
      });
    }
  } catch (error: unknown) {
    res.status(404).json({
      success: false,
      message: error as string,
    });
  }
};

export const productController = {
  productCreate,
  productData,
  specificProductData,
  updateSpecificProduct,
  deleteSpecificProduct,
};
