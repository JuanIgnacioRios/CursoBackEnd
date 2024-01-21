import express from 'express';
import fs from 'fs/promises'

const router = express.Router();

//Endpoints

router.post('/', async (req, res) => {
    let carts = []
    try{
        const cartsInFile = await fs.readFile('./files/carts.json', "utf8");
        carts = JSON.parse(cartsInFile);
        const newCart = {
            id: carts.length + 1,
            products: []
        };
        carts.push(newCart);
        await fs.writeFile('./files/carts.json', JSON.stringify(carts, null, 2))

        return res.send({status: "success", message: "Carrito Creado Correctamente"})
    }catch(error){
        res.status(400).send({status: "error", error: error})
    }
})

router.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try {
        const cartsInFile = await fs.readFile('./files/carts.json', "utf8");
        const carts = JSON.parse(cartsInFile);
        const cartsIndex = carts.findIndex(p => p.id === cartId);

        if(cartsIndex === -1){
            return res.status(400).send({status: "error", error: "No existe carrito con ese ID"})
        }else{
            return res.send({status: "success", productsInCart: carts[cartsIndex].products})
        }
    } catch (error) {
        res.status(400).send({status: "error", error: error})
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    //debe agregar el producto al array products del carrito
    //PRODUCT SOLO DEBE TENER EL ProductID, no agregar el producto completo
    //QUANTITY: Cant de ejemplares de ese producto, de momento se agregara de 1 en 1
    //Si un producto intenta agregarse al carrito que ya existe se debe incrementar su quantity
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    let productsInCart = [];
    let carts = [];
    try{
        const cartsInFile = await fs.readFile('./files/carts.json', 'utf8');
        carts = JSON.parse(cartsInFile);

        const cart = carts.find(c => c.id === cartId) 
        productsInCart =  cart.products

        let product = productsInCart.find(p => p.productId === productId)

        if(product){
            product.quantity += 1;
        } else{
            product = {
                productId,
                quantity: 1
            }
            productsInCart.push(product);
        }

        await fs.writeFile('./files/carts.json', JSON.stringify(carts, null, 2))

        res.send({status: "success", message: "Producto Agregado Correctamente al Carrito"});

    }catch(error){
        res.status(400).send({status: "error", error: error})
    }
})



export default router