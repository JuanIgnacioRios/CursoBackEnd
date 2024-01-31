import express from 'express'
import ProductManager from '../service/ProductManager.js';

const router = express.Router();

const ProductsManager = new ProductManager("./src/files/products.json");


router.get('/', async (req, res) => {
    const Productos = await ProductsManager.getProducts()
    res.render("home",{ Products: Productos })
})

router.get('/realTimeProducts', async (req,res)=>{
    const Productos = await ProductsManager.getProducts()
    res.render("realTimeProducts",{ Products: Productos })
})



export default router