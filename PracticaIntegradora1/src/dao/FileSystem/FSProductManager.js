import fs from"fs/promises";
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct({title, description, code, price, status, stock, category, thumbnails}) {
        let products = []
        try{
            const productsInFile = await fs.readFile(this.path, "utf8");
            products = JSON.parse(productsInFile);
            if(title && description && code && price && stock && category){
                let thumbnailsArray = thumbnails ? [thumbnails] : [];  
                const newProduct = {
                    id: uuidv4(),
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
                await fs.writeFile(this.path, JSON.stringify(products, null, 2))
                return {status: "success", message: "Producto Agregado Correctamente"}
            }else{
                return { status: "error", error: "El Producto a agregar no cuenta con todos los campos, por favor vuelva a intenar"}
            }

        }catch(error){
            return {status: "error", error: error}
        }
    }

    async getProducts(limit){ 
        let products = []
        try{
            const productsInFile = await fs.readFile(this.path, "utf8");
            products = JSON.parse(productsInFile);
            if (limit) {
                return { status: "success", products: products.splice(0, limit) }
            } else {
                return { status: "success", products: products }
            }
        }catch(error){
            return {status: "error", error: error}
        }
        return products
    }

    async getProductById(id) {
        try {
            const productsInFile = await fs.readFile(this.path, "utf8");
            const products = JSON.parse(productsInFile);
            const productIndex = products.findIndex(p => p.id === id);
    
            if (productIndex === -1) {
                return { status: "error", error: "No existe poducto con ese ID" }
            } else {
               return { status: "success", product: products[productIndex] }
            }
        } catch (error) {
            return { status: "error", error: error }
        }
        
    }

    async updateProduct(id, propertiesToUpdate) {
        try {
            const productsInFile = await fs.readFile(this.path, "utf8");
            let products = JSON.parse(productsInFile);
    
            let productToUpdate = products.find(p => p.id === id);
            const productToUpdateIndex = products.indexOf(productToUpdate);
    
            for (let property in propertiesToUpdate) {
                if (productToUpdate.hasOwnProperty(property)) {
                    products[productToUpdateIndex][property] = propertiesToUpdate[property];
                }
            }
    
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    
            return { status: "success", message: "Producto Actualizado Correctamente" }
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async deleteProduct(id) {
        let products = [];
        try {
            const productsInFile = await fs.readFile(this.path, "utf8");
            products = JSON.parse(productsInFile);

            let productIndex = products.findIndex(p => p.id === id);

            products.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))

            return { status: "success", message: "Producto Eliminado Correctamente" }

        } catch (error) {
            return { status: "error", error: error }
        }
    }
}

export default ProductManager