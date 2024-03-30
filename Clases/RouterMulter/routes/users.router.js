import express from "express";

const router = express.Router();

const users = []

//endpoint

router.get("/api/users", (req,res) => {
    res.json(users)
})

router.post("/api/users", (req,res) => {
    const newUser = req.body;
    users.push(newUser)
    res.json({message: "Usuario Creado"})
})


export default router