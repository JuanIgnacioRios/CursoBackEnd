import cartModel from '../dao/models/carts.model.js'
import productsModel from '../dao/models/products.model.js';

class CartManager {
    constructor() {}

    async addCart() {
        try {
            const newCart = {
                products: []
            };
            let result = await cartModel.create(newCart)
            return { status: "success", payload: result }
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async getCartById(id) {
        try {
            let cart = await cartModel.find({ _id: id })
            if (cart.length > 0) {
                return { status: "success", payload: cart }
            } else {
                CustomError.createError({
                    name: "No cart found",
                    cause: `It doesn't exist a cart with id: ${id} in the database.`,
                    message: "No cart found with the ID",
                    code: EErrors.NO_ID_FOUND
                })
            }
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async addProductToCart(cartId, productId, user) {
        try {
            let productObj = await productsModel.findOne({_id: productId})
            if(productObj.owner == user.email) return { status: "error", error: "Dueño del producto no puede agregarlo a su carrito" }
            let cart = await cartModel.find({ _id: cartId })
            let productsInCart = cart[0].products

            let product = productsInCart.find(p => p.productId.toString() === productId)


            if (product) {
                product.quantity += 1;
            } else {
                product = {
                    productId,
                    quantity: 1
                }
                productsInCart.push(product);
            }

            let result = await cartModel.updateOne({ _id: cartId }, { products: productsInCart });

            return { status: "success", payload: result };

        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async updateCartProducts(cartId, products) {
        try {
            let result = await cartModel.updateOne({ _id: cartId }, { products: products });
            return { status: "success", payload: result };
        } catch (error) {
            return { status: "error", error: error }
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            let cart = await cartModel.find({ _id: cartId });
            let productsInCart = cart[0].products;

            // Encontrar el índice del producto con el productId proporcionado
            let productIndex = productsInCart.findIndex(p => p.productId.toString() == productId);

            if (productIndex !== -1) {
                productsInCart.splice(productIndex, 1);
                let result = await cartModel.updateOne({ _id: cartId }, { products: productsInCart });
                return { status: "success", payload: result };
            } else {
                return { status: "error", error: "Product not found in cart" };
            }
        } catch (error) {
            return { status: "error", error: error };
        }
    }


    async deleteAllProductsFromCart(cartId) {
        try {
            let result = await cartModel.updateOne({ _id: cartId }, { products: [] });
            return { status: "success", payload: result };
        } catch (error) {
            return { status: "error", error: error };
        }
    }

    async updateProductsQuantity(cartId, productId, quantity) {
        try {
            let cart = await cartModel.find({ _id: cartId });

            let productsInCart = cart[0].products;

            let product = productsInCart.find(p => p.productId.toString() == productId);

            product.quantity = quantity;
            let result = await cartModel.updateOne({ _id: cartId }, { products: productsInCart });

            return { status: "success", payload: result };
        } catch (error) {
            console.log("Error:", error);
            return { status: "error", error: error };
        }
    }

}


export default CartManager