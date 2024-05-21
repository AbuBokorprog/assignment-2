import { Product as ProductModel } from './product-model';
import { Product } from './product.interface';

const createProductService = async (v: Product) => {
  const result = await ProductModel.create(v);
  return result;
};

const readAllProductService = () => {
  const result = ProductModel.find();
  return result;
};

// const readSpecificProduct = (v: string) => {
//   const result = ProductModel.findById(v);
//   return result;
// };

export const ProductService = {
  createProductService,
  readAllProductService,
  //   readSpecificProduct,
};
