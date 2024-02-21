import cartModel from './models/carts.model.js'

class MDBCartManager{
    constructor(){
    }

    async addCart(){
        try{
            const newCart = {
                products: []
            };
            let result = await cartModel.create(newCart)
            return {status: "success", payload: result}
        }catch(error){
            return {status: "error", error: error}
        }
    }

    async getCartById(id){
        try {
            let cart = await cartModel.find({_id: id})
            if(cart){
                return {status: "success", payload: cart}
            }else{
                return {status: "error", error: "No existe carrito con ese ID"}
            }
        } catch (error) {
            return {status: "error", error: error}
        }
    }

    async addProductToCart(cartId, productId){
        try{
            let cart = await cartModel.find({_id: cartId})
            let productsInCart = cart[0].products

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
            
            let result = await cartModel.updateOne({_id: cartId}, { products: productsInCart });

            return {status: "success", payload: result};

        }catch(error){
            return {status: "error", error: error}
        }
    }

}


export default MDBCartManager