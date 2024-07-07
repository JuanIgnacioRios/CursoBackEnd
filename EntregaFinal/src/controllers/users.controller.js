import usersService from "../dao/models/users.model.js"
import { createHash } from "../../utils.js"
import UsersManager from "../services/UsersManager.js"

const usersManager = new UsersManager();

async function getUsers(req, res) {
    try {
        const result = await usersManager.getUsers();
        res.send(result);
    } catch (error) {
        return res.send({status: "error", error: error})
    }
}

async function deleteUnactiveUsers(req,res){
    try{
        const result = await usersManager.deleteUnactiveUsers();
        res.send(result)
    } catch (error) {
        return res.send({status: "error", error: error})
    }
}

async function deleteUserById(req, res){
    try {
        const userId = req.params.uid
        const result = await usersService.deleteOne({_id: userId})
        res.send({status: "success", payload: result})
    } catch (error) {
        return res.send({status: "error", error: error})
    }
}

async function UpdateRole(req, res) {
    const userId = req.params.uid
    try {
        let result = ""
        const user = await usersService.findOne({ _id: userId })
        if (!user) return { status: "error", error: "Usuario no encontrado" }
        if (user.role == "user") {
            const requiredDocs = ['identification', 'address', 'bankaccount'];
            const userDocs = user.documents || [];

            const hasAllDocs = requiredDocs.every(docName =>
                userDocs.some(doc => doc.name === docName)
            );

            if (!hasAllDocs) return res.send({ status: "error", error: "No tiene los documentos necesarios para realizar el cambio de rol" })
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

async function changePassword(req, res) {
    const userId = req.params.uid
    const { password1, password2 } = req.body
    if (password1 != password2) return res.send({ status: "error", error: "Las contraseñas ingresadas no son iguales" })
    try {
        let result = await usersService.updateOne({ _id: userId }, { password: createHash(password1) })
        res.send({ status: "Success", payload: result })
    } catch (error) {
        return res.send({ status: "error", error: error })
    }
}

async function uploadFiles(req, res) {
    const userId = req.params.uid;
    const bfi = req.files;
    console.log("hola")
    try {
        const user = await usersService.findOne({ _id: userId });
        user.documents = user.documents || [];
        bfi.forEach((file) =>{
            const existingDocument = user.documents.find(doc => doc.name === file.fieldname);
            if (existingDocument) {
                existingDocument.reference = `uploads/${userId}-${file.originalname}`;
            }else {
                user.documents.push({
                    name: file.fieldname,
                    reference: `uploads/${userId}-${file.originalname}`,
                });
            }
        })

        const result = await usersService.updateOne({ _id: userId }, user);
        res.send({ status: "Success", payload: result });

    } catch (error) {
        return res.send({ status: "error", error: error });
    }
}

export default {
    UpdateRole,
    changePassword,
    uploadFiles,
    getUsers,
    deleteUnactiveUsers,
    deleteUserById
}