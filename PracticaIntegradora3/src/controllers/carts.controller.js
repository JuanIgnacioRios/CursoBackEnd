import CartManager from '../services/CartManager.js';
import ProductManager from '../services/ProductManager.js';
import TicketManager from '../services/TicketManager.js';

const CartsManager = new CartManager();
const ProductsManager = new ProductManager();
const TicketsManager = new TicketManager();

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
    let result = await CartsManager.addProductToCart(cartId, productId)
    res.send(result)
}

async function purchase(req, res) {
    const cartId = req.params.cid;
    const cart = await CartsManager.getCartById(cartId)
    let productsInCart = cart.payload[0].products
    let amount = 0;
    for (let index = 0; index < productsInCart.length; index++) {
        let product = await ProductsManager.getProductById(productsInCart[index].productId)
        let newStock = product.payload[0].stock - productsInCart[index].quantity
        console.log("title", product.payload[0].title)
        if (newStock >= 0) {
            amount += product.payload[0].price * productsInCart[index].quantity
            await ProductsManager.updateProduct(productsInCart[index].productId, { "stock": newStock })
            await CartsManager.deleteProductFromCart(cartId, productsInCart[index].productId)
        } else {
            return res.send({ status: "error", error: `No hay suficiente stock disponible de ${product.payload[0].title} para realizar la compra` })
        }
    }
    if (amount > 0) {
        res.send(await TicketsManager.createTicket(amount, req.user.email))
    } else {
        res.send({ status: "error", error: "No hay productos en el carrito" })
    }

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
    deleteAllProductsFromCart,
    purchase
}