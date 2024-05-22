import { Request, Response } from 'express';
import { ProductService } from './product-service';
import { ProductSchema, searchQuerySchema } from './product-validation';
import mongoose from 'mongoose';

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

const productData = async (req: Request, res: Response) => {
  try {
    const query = searchQuerySchema.parse(req.query);

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
      const data = await ProductService.readAllProductService(searchQuery);
      if (data.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term ${query?.searchTerm} fetched successfully!`,
          data,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Products matching search term ${query?.searchTerm} not found`,
        });
      }
    } else {
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

const specificProductData = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(500).json({ success: false, message: 'Invalid product ID' });
    }
    const data = await ProductService.readSpecificProduct(productId);
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
  } catch (error: unknown) {
    res.status(404).json({
      success: false,
      message: error as string,
    });
  }
};

const updateSpecificProduct = async (req: Request, res: Response) => {
  const id = req.params.productId;
  const { updateData } = req.body;
  const data = await ProductService.updateSpecificProduct(id, updateData);
  try {
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

const deleteSpecificProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  let data = await ProductService.deleteSpecificProduct(productId);
  try {
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
        message: "The product couldn't find ",
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
