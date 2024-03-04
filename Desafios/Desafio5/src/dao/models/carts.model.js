import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products:{
        type: [{
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number}
        ],
        required: true,
    }
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel