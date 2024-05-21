import express from 'express';
import { productController } from './product-controller';
const router = express.Router();

router.post('/', productController.productCreate);
router.get('/', productController.productData);
router.get('/:productId', productController.specificProductData);
router.put('/:productId', productController.updateSpecificProduct);
router.delete('/:productId', productController.deleteSpecificProduct);
// router.get('/?searchTerm=iphone', productController.findSearchProducts);
export const productRoutes = router;
