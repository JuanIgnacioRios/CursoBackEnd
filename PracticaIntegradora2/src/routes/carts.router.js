import express from 'express';
import CartManager from '../services/CartManager.js';

const CartsManager = new CartManager();
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

router.put('/:cid', async (req, res)=>{
    const cartId = req.params.cid
    let { products } = req.body;
    let result = await CartsManager.updateCartProducts(cartId, products)
    res.send(result)
})


router.put('/:cid/products/:pid', async (req, res) =>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    let { quantity } = req.body;
    let result = await CartsManager.updateProductsQuantity(cartId, productId, quantity)
    res.send(result)
})

router.delete('/:cid/product/:pid', async (req, res) =>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    let result = await CartsManager.deleteProductFromCart(cartId, productId)
    res.send(result)
})

router.delete('/:cid', async (req, res) =>{
    const cartId = req.params.cid;
    let result = await CartsManager.deleteAllProductsFromCart(cartId)
    res.send(result)
})



export default router