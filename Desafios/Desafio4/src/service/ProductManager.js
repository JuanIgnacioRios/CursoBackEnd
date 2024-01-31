import fs from"fs/promises";
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.initializeFile();
    }

    //Esta funcion crea el archivo en caso de que no exista
    async initializeFile() {
        try {
            await fs.access(this.path);
        } catch (error) {
            await fs.writeFile(this.path, '[]');
        }
    }

    async addProduct({title, description, code, price, status, stock, category, thumbnails}) {
        try {
            let products = []
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
                console.log("Producto Agregado")
            } else {
                console.log("El producto que se quiere agregar cuenta con un código ya existente en la lista de productos o no cuenta con todos los campos.");
            }

        }
        catch (error) { console.error("Error al agregar un Producto ", error) }
    }

    async getProducts(){ 
        let products = []
        try{
            const productsInFile = await fs.readFile(this.path, "utf8");
            products = JSON.parse(productsInFile);
        }catch(error){
            console.log(error)
        }
        return products
    }

    async getProductById(id) {
        let product = "";
        try {
            const fileContent = await fs.readFile(this.path, "utf8");
            let productsInFile = JSON.parse(fileContent);

            product = productsInFile.find(p => p.id === id);
        } catch (error) {
            console.error("Error al obtener producto con ID: ", id, error)
        }
        return product
    }

    async updateProduct(id, propertiesToUpdate) {
        try {
            const fileContent = await fs.readFile(this.path, "utf8");
            let productsInFile = JSON.parse(fileContent);
            let productToUpdate = productsInFile.find(p => p.id === id);
            const productToUpdateIndex = productsInFile.indexOf(productToUpdate);
            for (let property in propertiesToUpdate) {
                if (productToUpdate.hasOwnProperty(property)) {
                    productsInFile[productToUpdateIndex][property] = propertiesToUpdate[property];
                }
            }

            await fs.writeFile(this.path, JSON.stringify(productsInFile, null, 2));

            console.log("Producto Actualizado");
        } catch (error) {
            console.error("Error al actualizar el producto ", error)
        }
    }

    async deleteProduct(id) {
        try {
            const fileContent = await fs.readFile(this.path, "utf8");
            let productsInFile = JSON.parse(fileContent);

            let productIndex = productsInFile.findIndex(p => p.id === id);

            productsInFile.splice(productIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(productsInFile, null, 2))

            console.log("Producto Eliminado")

        } catch (error) {
            console.error("Error al eliminar el producto ", error)
        }
    }
}

export default ProductManager