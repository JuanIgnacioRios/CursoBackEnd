import CartManager from '../services/CartManager.js';

const CartsManager = new CartManager();

async function createCart(req, res) {
    let result = await CartsManager.addCart();
    res.send(result)
}

async function getCartById(req, res) {
    const cartId = req.params.cid;
    let result = await CartsManager.getCartById(cartId);
    res.send(result)
}

async function addProductToCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const user = req.user;
    let result = await CartsManager.addProductToCart(cartId, productId, user)
    res.send(result)
}

async function updateCartProducts(req, res) {
    const cartId = req.params.cid
    let { products } = req.body;
    let result = await CartsManager.updateCartProducts(cartId, products)
    res.send(result)
}

async function updateProductsQuantity(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    let { quantity } = req.body;
    let result = await CartsManager.updateProductsQuantity(cartId, productId, quantity)
    res.send(result)
}

async function deleteProductFromCart(req, res) {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    let result = await CartsManager.deleteProductFromCart(cartId, productId)
    res.send(result)
}


async function deleteAllProductsFromCart(req, res) {
    const cartId = req.params.cid;
    let result = await CartsManager.deleteAllProductsFromCart(cartId)
    res.send(result)
}

export default {
    createCart,
    getCartById,
    addProductToCart,
    updateCartProducts,
    updateProductsQuantity,
    deleteProductFromCart,
    deleteAllProductsFromCart
}