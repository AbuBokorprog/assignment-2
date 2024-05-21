import { Product as ProductModel } from './product-model';
import { Product } from './product.interface';

const createProductService = async (v: Product) => {
  const result = await ProductModel.create(v);
  return result;
};

const readAllProductService = (v: Product) => {
  console.log(v);
};

export const ProductService = { createProductService, readAllProductService };
