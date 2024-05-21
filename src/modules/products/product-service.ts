import { Product as ProductModel } from './product-model';
import { Product } from './product.interface';

const createProductService = async (v: Product) => {
  const result = await ProductModel.create(v);
  return result;
};

const readAllProductService = () => {
  const result = ProductModel.find().select({ __v: 0 });
  return result;
};

const readSpecificProduct = (v: string) => {
  const result = ProductModel.findById(v).select({
    _id: 0,
    'inventory._id': 0,
    'variants._id': 0,
  });
  return result;
};

const updateSpecificProduct = (v1: string, v2: number) => {
  const newQuantity = v2;
  const result = ProductModel.findByIdAndUpdate(
    v1,
    { 'inventory.quantity': newQuantity },
    { new: true },
  ).select({ _id: 0, 'inventory._id': 0, 'variants._id': 0 });
  return result;
};

export const ProductService = {
  createProductService,
  readAllProductService,
  readSpecificProduct,
  updateSpecificProduct,
};
