import fs from"fs/promises";
import { v4 as uuidv4 } from 'uuid';

class CartManager{
    constructor(path){
        this.path = path;
    }

    async addCart(){
        let carts = []
        try{
            const cartsInFile = await fs.readFile(this.path, "utf8");
            carts = JSON.parse(cartsInFile);
            const newCart = {
                id: uuidv4(),
                products: []
            };
            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2))

            return {status: "success", message: "Carrito Creado Correctamente"}
        }catch(error){
            return {status: "error", error: error}
        }
    }

    async getCartById(id){
        try {
            const cartsInFile = await fs.readFile(this.path, "utf8");
            const carts = JSON.parse(cartsInFile);
            const cartsIndex = carts.findIndex(p => p.id === id);
    
            if(cartsIndex === -1){
                return {status: "error", error: "No existe carrito con ese ID"}
            }else{
                return {status: "success", productsInCart: carts[cartsIndex].products}
            }
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    async addProductToCart(cartId, productId){
        let productsInCart = [];
        let carts = [];
        try{
            const cartsInFile = await fs.readFile(this.path, 'utf8');
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

            await fs.writeFile(this.path, JSON.stringify(carts, null, 2))

            return {status: "success", message: "Producto Agregado Correctamente al Carrito"};

        }catch(error){
            return {status: "error", error: error}
        }
    }

}



export default CartManager