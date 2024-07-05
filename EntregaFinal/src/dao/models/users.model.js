import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        index: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }, 
    documents: Array,
    last_connection: Date,

})

const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel