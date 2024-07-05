import usersService from "../dao/models/users.model.js"
import { createHash } from "../../utils.js"

async function getUsers() {

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
    const files = req.body;
    const bfi = req.files;
    try {
        const user = await usersService.findOne({ _id: userId });

        user.documents = user.documents || [];
        Object.keys(files).forEach((fileKey) => {
            if (files[fileKey]) {
                const existingDocument = user.documents.find(doc => doc.name === fileKey);
                if (existingDocument) {
                    existingDocument.reference = `uploads/${files[fileKey]}`;
                } else {
                    user.documents.push({
                        name: fileKey,
                        reference: `uploads/${userId}-${files[fileKey]}`,
                    });
                }
            }
        });

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
    getUsers
}