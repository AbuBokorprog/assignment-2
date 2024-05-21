import { Request, Response } from 'express';
import { ProductService } from './product-service';
import { ProductSchema } from './product-validation';

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
  const data = await ProductService.readAllProductService();
  try {
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

const specificProductData = async (req: Request, res: Response) => {
  const id = req.params.productId;
  const data = await ProductService.readSpecificProduct(id);
  try {
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
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
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

export const productController = {
  productCreate,
  productData,
  specificProductData,
  updateSpecificProduct,
};
