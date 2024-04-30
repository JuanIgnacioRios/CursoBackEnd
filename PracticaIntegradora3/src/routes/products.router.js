import express from 'express';
import productsController from '../controllers/products.controller.js';
import { authorization } from '../../utils.js';

const router = express.Router();

//Endpoints

router.get('/', productsController.getProducts)
router.get('/:pid', productsController.getProductById)
router.post('/', authorization('admin'), productsController.addProduct)
router.put('/:pid', authorization('admin'), productsController.updateProduct)
router.delete('/:pid', authorization('admin'), productsController.deleteProduct)

export default router