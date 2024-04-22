import productsDAO from '../dao/products.mongo.js'
import ProductDTO from '../dao/dtos/product.dto.js';

const productsModel = new productsDAO()


class ProductManager {
    constructor() {
    }

    async addProduct({title, description, code, price, status, stock, category, thumbnails}) {
        try{
            if(title && description && code && price && stock && category){
                let newProduct = new ProductDTO({title, description, code, price, status, stock, category, thumbnails})
                let result = await productsModel.create(newProduct)
                return {status: "success", payload: result}
            }else{
                return { status: "error", error: "El Producto a agregar no cuenta con todos los campos, por favor vuelva a intenar"}
            }

        }catch(error){
            return {status: "error", error: error}
        }
    }

    async getProducts(limit, page, sort, query){
        try {
            const options = { limit, page, lean: true };
            if (sort) options.sort = sort;
            
            const filter = query ? JSON.parse(query) : {};

            const products = await productsModel.get(filter, options);
            return { status: "success", payload: products };
        } catch(error) {
            return { status: "error", error: error }
        }
    }
    

    async getProductById(id) {
        try {
            const product = await productsModel.find({ _id: id});
            console.log(product)
            if (product.length > 0) {
                return { status: "success", payload: product }
            } else {
                return { status: "error", error: "No existe producto con ese ID" }
            }
        } catch (error) {
            return { status: "error", error: error }
        }
        
    }

    async updateProduct(id, propertiesToUpdate) {
        try {
            let result = await productsModel.update({_id: id}, propertiesToUpdate)
            return { status: "success", payload: result }
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async deleteProduct(id) {
        try {
            let result = await productsModel.delete({_id:  id})
            return { status: "success", payload: result }

        } catch (error) {
            return { status: "error", error: error }
        }
    }
}

export default ProductManager