import usersModel from "../dao/models/users.model"

async function UpdateRole(){
    const userId = req.params.uid
    try {
        const user = await usersModel.findOne({_id: userId})
        if(!user) return { status: "error", error: "Usuario no encontrado" }
        if(user.role == "user"){
            let result = await usersModel.updateOne({_id: userId}, {role: "premium"})
        }else if(user.role == "premium"){
            let result = await usersModel.updateOne({_id: userId}, {role: "user"})
        }else{
            return { status: "error", error: "Usuario con rol invalido para realizar cambio" }
        }
        return {status: "success", payload: result}

    } catch (error) {
        return { status: "error", error: error }
    } 
}

export default {
    UpdateRole,
}