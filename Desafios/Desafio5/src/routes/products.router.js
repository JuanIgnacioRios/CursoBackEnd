import express from 'express';
import ProductManager from '../services/ProductManager.js';

const ProductsManager = new ProductManager();
const router = express.Router();

//Endpoints

router.get('/', async (req, res) => {
    let { limit = 10, page = 1, sort, query } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    const result = await ProductsManager.getProducts(limit, page, sort, query);
    res.send(result);
})


router.get('/:pid', async (req, res) => {
    const productID = req.params.pid
    let result = await ProductsManager.getProductById(productID)
    res.send(result)
})

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    let result = await ProductsManager.addProduct({ title, description, code, price, status, stock, category, thumbnails })
    res.send(result)
})

router.put('/:pid', async (req, res) => {
    const productID = req.params.pid;
    const propertiesToUpdate = req.body;
    let result = await ProductsManager.updateProduct(productID, propertiesToUpdate)
    res.send(result)
})

router.delete('/:pid', async (req, res) => {
    const productID = req.params.pid;
    let result = await ProductsManager.deleteProduct(productID)
    res.send(result)
})

export default router 