import productsModel from "./models/products.model.js"

class ProductsDAO{
    constructor(){}

    get = async(filter, options)=>{
        try {
            let products = await productsModel.paginate(filter, options);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    create = async(product)=>{
        try{
            let result = await productsModel.create(product)
            return result
        }catch(error){
            console.log(error)
        }
    }

    find = async(parameter) =>{
        try{
            const product = await productsModel.find(parameter);
            return product
        }catch(error){
            console.log(error)
        }
    }

    update = async(id, propertiesToUpdate)=>{
        try {
            let result = await productsModel.updateOne({_id: id}, propertiesToUpdate)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    delete = async(id) =>{
        try{
            let result = await productsModel.deleteOne(id)
            return result
        }catch(error){
            console.log(error)
        }
    }
}

export default ProductsDAO