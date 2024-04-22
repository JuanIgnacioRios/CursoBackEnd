import usersModel from "./models/users.model.js";

class UsersDAO{
    constructor(){}

    find = async(parameter)=>{
        try{
            let user = await usersModel.findOne(parameter)
            return user
        }catch(error){
            console.log(error)
        }
    }

    create = async(user)=>{
        try {
            let result = await usersModel.create(user)
            return result
        } catch (error) {
           console.log(error) 
        }
    }

}

export default UsersDAO