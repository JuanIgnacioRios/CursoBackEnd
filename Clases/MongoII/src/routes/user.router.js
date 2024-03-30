import {Router} from 'express';
import userModel from '../models/order.model.js';

const router = Router();


router.get("/", async (req,res)=>{
    try{
        let users = await userModel.find();
        res.send({status: "Success", payload: users})
    }catch(error){
        res.send({status: "errror", error: error})
    }
})

router.post("/", async (req,res)=>{
    let {nombre, apellido, email} = req.body
    if(!nombre || !apellido || !email){
        res.send({status: "error", error: "Faltan datos para crear un usuario"})
    }
    try{
        let result = await userModel.create({nombre, apellido, email})
        res.send({result: "success", payload: result})
    }catch(error){
        res.send({status: "error", error: error})
    }
})

router.put("/:uid", async (req,res)=>{
    let userId = req.params.uid;
    let userToReplace = req.body;
    if(!userToReplace.nombre && !userToReplace.apellido && !userToReplace.email){
        res.send({status: "error", error: "Faltan datos para crear un usuario"})
    }
    try{
        let result = await userModel.updateOne({_id: userId}, userToReplace)
        res.send({result: "success", payload: result})
    }catch(error){
        res.send({status: "error", error: error})
    }
})

router.delete("/:uid", async (req, res)=>{
    let userId = req.params.uid;
    try{
        let result = await userModel.deleteOne({_id: userId})
        res.send({result: "success", payload: result})
    }catch(error){
        res.send({status: "error", error: error})
    }
})



export default router