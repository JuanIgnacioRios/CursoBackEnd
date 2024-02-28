import express from 'express'
import ProductManager from '../services/ProductManager.js';
import CartManager from '../services/CartManager.js';

const router = express.Router();

const ProductsManager = new ProductManager();
const CartsManager = new CartManager();

router.get('/products', async (req, res) => {
    let { limit, page, sort, query } = req.query;
    if (!limit) limit = 10;
    if (!page) page = 1;
    let result = await ProductsManager.getProducts(limit, parseInt(page), sort, query)
    let Productos = result.payload.docs
    res.render("products",{ Products: Productos })
})

/* router.get('/cart/:id', async (req,res)=>{
    const cartId = req.params.id
    let result = await CartsManager.getCartById(cartId)
    let Productos = result.payload[0].products.map(product => ({
        productId: product.productId.toString(),
        quantity: product.quantity
    }));
    res.render("cart",{ Products: Productos })
}) */

router.get('/cart/:id', async (req,res)=>{
    const cartId = req.params.id
    let result = await CartsManager.getCartById(cartId)
    
    let Productos = [];
    for (const product of result.payload[0].products) {
        let productName = await ProductsManager.getProductById(product.productId.toString());
        console.log(productName)
        Productos.push({
            productId: productName.payload.title,
            quantity: product.quantity
        });
    }

    console.log(Productos)
    
    res.render("cart",{ Products: Productos })
})


export default router