import ProductManager from '../services/ProductManager.js';

const ProductsManager = new ProductManager();

async function getProducts(req, res) {
    let { limit = 10, page = 1, sort, query } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);
    const result = await ProductsManager.getProducts(limit, page, sort, query);
    res.send(result);
}

async function getProductById(req, res) {
    const productID = req.params.pid
    let result = await ProductsManager.getProductById(productID)
    res.send(result)
}

async function addProduct(req, res) {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const {email} = req.user.email
    let result = await ProductsManager.addProduct({ title, description, code, price, status, stock, category, thumbnails,email })
    res.send(result)
}

async function updateProduct(req, res) {
    const productID = req.params.pid;
    const propertiesToUpdate = req.body;
    let result = await ProductsManager.updateProduct(productID, propertiesToUpdate)
    res.send(result)
}

async function deleteProduct(req, res) {
    const productID = req.params.pid;
    const user = req.user
    let result = await ProductsManager.deleteProduct(productID, user)
    res.send(result)
}

export default {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}