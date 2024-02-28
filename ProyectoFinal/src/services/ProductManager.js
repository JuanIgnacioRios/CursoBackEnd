import productsModel from '../dao/models/products.model.js'

class ProductManager {
    constructor() {
    }

    async addProduct({title, description, code, price, status, stock, category, thumbnails}) {
        try{
            if(title && description && code && price && stock && category){
                let thumbnailsArray = thumbnails ? [thumbnails] : [];  
                const newProduct = {
                    title,
                    description,
                    code,
                    price,
                    status: status || true,
                    stock,
                    category,
                    thumbnails: thumbnailsArray
                };
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
        try{
            const options = { limit, page, lean: true };
            if (sort) options.sort = sort;
            console.log(query)
            const products = await productsModel.paginate(query, options);
            return { status: "success", payload: products };
        }catch(error){
            return {status: "error", error: error}
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.find({ _id: id});
            if (product) {
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
            let result = await productsModel.updateOne({_id: id}, propertiesToUpdate)
            return { status: "success", payload: result }
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async deleteProduct(id) {
        try {
            let result = await productsModel.deleteOne({_id:  id})
            return { status: "success", payload: result }

        } catch (error) {
            return { status: "error", error: error }
        }
    }
}

export default ProductManager