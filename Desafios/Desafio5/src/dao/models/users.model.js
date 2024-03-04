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
    isAdmin:{
        type: Boolean,
        default: false
    } 
})

const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel