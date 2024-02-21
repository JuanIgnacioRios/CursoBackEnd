import mongoose, { Mongoose } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products:{
        type: Array,
        required: true,
    }
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel