import { Request, Response } from 'express';
import { ProductService } from './product-service';
import { ProductSchema, searchQuerySchema } from './product-validation';

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
        name: { $regex: query.searchTerm, $options: 'i' },
      };

      const data = await ProductService.readAllProductService(searchQuery);
      res.status(200).json({
        success: true,
        message: "Products matching search term 'iphone' fetched successfully!",
        data,
      });
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
  const id = req.params.productId;
  const data = await ProductService.readSpecificProduct(id);
  try {
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
