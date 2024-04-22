import ProductManager from '../services/ProductManager.js';
import CartManager from '../services/CartManager.js';

const ProductsManager = new ProductManager();
const CartsManager = new CartManager();

async function renderProducts(req, res) {
    if(!req.session.user){
        return res.redirect('/login')
    }
    let { limit, page, sort, query } = req.query;
    if (!limit) limit = 10;
    if (!page) page = 1;
    let result = await ProductsManager.getProducts(limit, parseInt(page), sort, query)
    let Productos = result.payload.docs

    const { first_name, last_name, email, age, isAdmin } = req.session.user
    res.render("products", { Products: Productos, first_name, last_name, email, age, isAdmin })
}

async function renderLogin(req, res) {
    res.render("login")
}

async function renderRegister(req, res) {
    res.render("register")
}

async function renderCart(req, res) {
    const cartId = req.params.id
    let result = await CartsManager.getCartById(cartId)

    let Productos = [];
    for (const product of result.payload[0].products) {
        let productName = await ProductsManager.getProductById(product.productId.toString());
        Productos.push({
            productId: productName.payload.title,
            quantity: product.quantity
        });
    }

    res.render("cart", { Products: Productos })
}

export default {
    renderProducts,
    renderLogin,
    renderRegister,
    renderCart
}