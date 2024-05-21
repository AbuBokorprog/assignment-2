import express from 'express';
import { productController } from './product-controller';
const route = express.Router();

route.post('/', productController.productCreate);
route.get('/', productController.productData);
// route.get('/:productId', productController.specificProductData);

export const productRoutes = route;
