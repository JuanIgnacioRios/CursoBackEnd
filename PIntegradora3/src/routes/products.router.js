import express from 'express';
import productsController from '../controllers/products.controller.js';
import { authorization, authToken } from '../../utils.js';

const router = express.Router();

//Endpoints

router.get('/', productsController.getProducts)
router.get('/:pid', productsController.getProductById)
router.post('/',authToken ,authorization("premium"),  productsController.addProduct)
router.put('/:pid',authToken, authorization("premium"), productsController.updateProduct)
router.delete('/:pid',authToken,authorization("premium"), productsController.deleteProduct)

export default router