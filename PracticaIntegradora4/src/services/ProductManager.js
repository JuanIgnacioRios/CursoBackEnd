import productsModel from '../dao/models/products.model.js'
import CustomError from './errors/CustomError.js';
import EErrors from './errors/enums.js';
import { addProductErrorInfo } from './errors/info.js';

class ProductManager {
    constructor() {}

    async addProduct({ title, description, code, price, status, stock, category, thumbnails, email }) {
        try {
            if (title && description && code && price && stock && category) {
                let thumbnailsArray = thumbnails ? [thumbnails] : [];
                const newProduct = {
                    title,
                    description,
                    code,
                    price,
                    status: status || true,
                    stock,
                    category,
                    thumbnails: thumbnailsArray,
                    owner: email
                };
                let result = await productsModel.create(newProduct)
                return { status: "success", payload: result }
            } else {
                CustomError.createError({
                    name: "Adding Product Error",
                    cause: addProductErrorInfo({ title, description, code, price, stock, category }),
                    message: "Error trying to add a product",
                    code: EErrors.INVALID_TYPE_ERROR
                })
            }

        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async getProducts(limit, page, sort, query) {
        try {
            const options = { limit, page, lean: true };
            if (sort) options.sort = sort;

            const filter = query ? JSON.parse(query) : {};

            const products = await productsModel.paginate(filter, options);
            console.log(limit)
            return { status: "success", payload: products };
        } catch (error) {
            return { status: "error", error: error }
        }
    }


    async getProductById(id) {
        try {
            const product = await productsModel.find({ _id: id });
            if (product.length > 0) {
                return { status: "success", payload: product }
            } else {
                CustomError.createError({
                    name: "No product found",
                    cause: `It doesn't exist a product with id: ${id} in the database.`,
                    message: "No product found with the ID",
                    code: EErrors.NO_ID_FOUND
                })
            }
        } catch (error) {
            return { status: "error", error: error }
        }

    }

    async updateProduct(id, propertiesToUpdate, user) {
        try {
            let product = await productsModel.findOne({ _id: id })
            if(product.owner == user.email || user.role == "admin"){
                let result = await productsModel.updateOne({ _id: id }, propertiesToUpdate)
                return { status: "success", payload: result }
            }else{
                return {status: "error", error: "El usuario no es dueño de ese producto, por lo que no puede eliminarlo."}
            }
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async deleteProduct(id, user) {
        try {
            let product = await productsModel.findOne({ _id: id })
            if(product.owner == user.email || user.role == "admin"){
                let result = await productsModel.deleteOne({ _id: id })
                return { status: "success", payload: result }
            }else{
                return {status: "error", error: "El usuario no es dueño de ese producto, por lo que no puede eliminarlo."}
            }

        } catch (error) {
            return { status: "error", error: error }
        }
    }
}

export default ProductManager