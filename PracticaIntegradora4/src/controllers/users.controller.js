import usersService from "../dao/models/users.model.js"
import { createHash } from "../../utils.js"

async function UpdateRole(req, res) {
    const userId = req.params.uid
    try {
        let result = ""
        const user = await usersService.findOne({ _id: userId })
        if (!user) return { status: "error", error: "Usuario no encontrado" }
        if (user.role == "user") {
            result = await usersService.updateOne({ _id: userId }, { role: "premium" })
        } else if (user.role == "premium") {
            result = await usersService.updateOne({ _id: userId }, { role: "user" })
        } else {
            return res.send({ status: "error", error: "Usuario con rol invalido para realizar cambio" })
        }
        return res.send({ status: "success", payload: result })

    } catch (error) {
        return res.send({ status: "error", error: error })
    }
}

async function changePassword(req, res){
    const userId = req.params.uid
    const { password1, password2 } = req.body
    if(password1 != password2) return res.send({ status: "error", error: "Las contraseñas ingresadas no son iguales" })
    try {
        let result = await usersService.updateOne({ _id: userId }, { password: createHash(password1) })
        res.send({status: "Success", payload: result})
    } catch (error) {
        return res.send({ status: "error", error: error })
    }
}

export default {
    UpdateRole,
    changePassword
}