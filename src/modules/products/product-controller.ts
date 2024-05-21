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

const productData = (req: Request, res: Response) => {
  res.send('Product data');
};

export const productController = { productCreate, productData };
