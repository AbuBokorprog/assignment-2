import express from 'express';
import { productController } from './product-controller';
const route = express.Router();

route.post('/', productController.productCreate);
route.get('/', productController.productData);

export const productRoutes = route;
