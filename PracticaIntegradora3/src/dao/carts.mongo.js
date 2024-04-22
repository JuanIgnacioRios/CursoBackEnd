import cartsModel from './models/carts.model.js'

class CartsDAO{
    constructor(){}

    find = async(parameter)=>{
        try{
            let cart = await cartsModel.find(parameter)
            return cart
        }catch(error){
            console.log(error)
        }
    }

    create = async(cart)=>{
        try {
            let result = await cartsModel.create(cart)
            return result
        } catch (error) {
            console.log(result)
        }

    }

    update = async(id,propertiesToUpdate)=>{
        try{
            let result = await cartsModel.updateOne(id, propertiesToUpdate)
            return result
        }catch(error){
            console.log(error)
        }
    }

    delete = async(id)=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsDAO