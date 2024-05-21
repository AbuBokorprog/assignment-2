import { Products as ProductModel } from './product-model';
import { Product } from './product.interface';

const createProductService = async (v: Product) => {
  const result = await ProductModel.create(v);
  return result;
};

const readAllProductService = async (v?: object) => {
  if (v) {
    const result = await ProductModel.find(v).select({
      __v: 0,
      'inventory._id': 0,
      'variants._id': 0,
    });
    return result;
  } else {
    const result = await ProductModel.find().select({
      __v: 0,
      'inventory._id': 0,
      'variants._id': 0,
    });
    return result;
  }
};

const readSpecificProduct = async (v: string) => {
  const result = await ProductModel.findById(v).select({
    _id: 0,
    'inventory._id': 0,
    'variants._id': 0,
    __v: 0,
  });
  return result;
};

const updateSpecificProduct = async (v1: string, v2: number) => {
  const newQuantity = v2;
  const result = await ProductModel.findByIdAndUpdate(
    v1,
    { 'inventory.quantity': newQuantity },
    { new: true },
  ).select({ _id: 0, 'inventory._id': 0, 'variants._id': 0 });
  return result;
};

const deleteSpecificProduct = async (v: string) => {
  const result = await ProductModel.findOneAndDelete({ _id: v });
  return result;
};

export const ProductService = {
  createProductService,
  readAllProductService,
  readSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
};
