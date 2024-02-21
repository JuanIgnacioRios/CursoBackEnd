import productsModel from './models/products.model.js'

class MDBProductManager {
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

    async getProducts(limit){
        try{
            let products = await productsModel.find();
            if (limit) {
                return { status: "success", payload: products.splice(0, limit) }
            } else {
                return { status: "success", payload: products }
            }
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

export default MDBProductManager