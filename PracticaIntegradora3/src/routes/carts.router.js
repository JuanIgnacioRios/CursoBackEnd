import express from 'express';
import cartController from '../controllers/carts.controller.js'
import { passportCall } from '../../utils.js';

const router = express.Router();

router.get('/:cid', cartController.getCartById)
router.post('/', cartController.createCart)
router.post('/:cid/product/:pid', cartController.addProductToCart)
router.post('/:cid/purchase', passportCall('jwt', { session: false }), cartController.purchase)
router.put('/:cid', cartController.updateCartProducts)
router.put('/:cid/products/:pid', cartController.updateProductsQuantity)
router.delete('/:cid/product/:pid', cartController.deleteProductFromCart)
router.delete('/:cid', cartController.deleteAllProductsFromCart)

export default router