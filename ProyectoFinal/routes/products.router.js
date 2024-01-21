import express from 'express';
import fs from 'fs/promises';

const router = express.Router();

//Endpoints

router.get('/', async (req, res) => {
    let {limit} = req.query;
    let products = []
    try{
        const productsInFile = await fs.readFile('./files/products.json', "utf8");
        products = JSON.parse(productsInFile);
        if(limit){
            res.send({status: "success", products: products.splice(0,limit)})
        }else{
            res.send({status: "success", products: products})
        }
    }catch(error){
        res.status(400).send({status: "error", error: error})
    }
    
})

router.get('/:pid', async (req, res) => {
    const productID = parseInt(req.params.pid)
    try {
        const productsInFile = await fs.readFile('./files/products.json', "utf8");
        const products = JSON.parse(productsInFile);
        const productIndex = products.findIndex(p => p.id === productID);

        if(productIndex === -1){
            res.status(400).send({status: "error", error: "No existe poducto con ese ID"})
        }else{
            res.send({status: "success", product: products[productIndex]})
        }
    } catch (error) {
        res.status(400).send({status: "error", error: error})
    }
})

router.post('/', async (req, res) => {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    let products = []
    try{
        const productsInFile = await fs.readFile('./files/products.json', "utf8");
        products = JSON.parse(productsInFile);
        if(title && description && code && price && stock && category){
            let thumbnailsArray = thumbnails ? [thumbnails] : [];  
            const newProduct = {
                id: products.length + 1,
                title,
                description,
                code,
                price,
                status: status || "true",
                stock,
                category,
                thumbnails: thumbnailsArray
            };
            products.push(newProduct);
            await fs.writeFile('./files/products.json', JSON.stringify(products, null, 2))
            res.send({status: "success", message: "Producto Agregado Correctamente"})
        }else{
            res.status(400).send({ status: "error", error: "El Producto a agregar no cuenta con todos los campos, por favor vuelva a intenar"})
        }

    }catch(error){
        res.status(400).send({status: "error", error: error})
    }
})

router.put('/:pid', async (req, res) => {
    const productID = parseInt(req.params.pid);
    const propertiesToUpdate = req.body;
    try {
        const productsInFile = await fs.readFile('./files/products.json', "utf8");
        let products = JSON.parse(productsInFile);

        let productToUpdate = products.find(p => p.id === productID);
        const productToUpdateIndex = products.indexOf(productToUpdate);

        for (let property in propertiesToUpdate) {
            if (productToUpdate.hasOwnProperty(property)) {
                products[productToUpdateIndex][property] = propertiesToUpdate[property];
            }
        }

        await fs.writeFile('./files/products.json', JSON.stringify(products, null, 2));

        res.send({status: "success", message: "Producto Actualizado Correctamente"})
    } catch (error) {
        res.status(400).send({status: "error", error: error})
    }
})

router.delete('/:pid', async (req, res) => {
    const productID = parseInt(req.params.pid);
    let products = [];
    try {
        const productsInFile = await fs.readFile('./files/products.json', "utf8");
        products = JSON.parse(productsInFile);

        let productIndex = products.findIndex(p => p.id === productID);

        products.splice(productIndex, 1);
        await fs.writeFile('./files/products.json', JSON.stringify(products, null, 2))

        res.send({status: "success", message: "Producto Eliminado Correctamente"})

    } catch (error) {
        res.status(400).send({status: "error", error: error})
    }
})

export default router 