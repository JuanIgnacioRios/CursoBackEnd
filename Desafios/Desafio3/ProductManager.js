const fs = require("fs/promises");

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

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {
            let products = []
            const fileContent = await fs.readFile(this.path, "utf8");
            products = JSON.parse(fileContent);

            if (!products.find(product => product.code === code) && title && description && price && thumbnail && code && stock) {
                const newProduct = {
                    id: products.length + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };

                products.push(newProduct);
                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log("Producto Agregado con Exito")
            } else {
                console.log("El producto que se quiere agregar cuenta con un código ya existente en la lista de productos o no cuenta con todos los campos.");
            }

        }
        catch (error) { console.error("Error al agregar un Producto ", error) }

    }

    async getProducts() {
        let productsInFile = [];
        try {
            const fileContent = await fs.readFile(this.path, "utf8");
            productsInFile = JSON.parse(fileContent);
        } catch (error) {
            console.error("Error al obtener los productos ", error)
        }
        return productsInFile;
    }

    async getProductById(id) {
        let product = "";
        try {
            const fileContent = await fs.readFile(this.path, "utf8");
            let productsInFile = JSON.parse(fileContent);

            product = productsInFile.find(p => p.id === id);
        } catch (error) {
            console.error("Erro al obtener producto con ID: ", id, error)
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

module.exports = { ProductManager };