import express from 'express';
import CartManager from '../services/CartManager.js';

const CartsManager = new CartManager("./src/files/carts.json");
const router = express.Router();

//Endpoints

router.post('/', async (req, res) => {
    let result = await CartsManager.addCart();
    res.send(result)
})

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    let result = await CartsManager.getCartById(cartId);
    res.send(result)
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    let result = await CartsManager.addProductToCart(cartId, productId)
    res.send(result)
})



export default router