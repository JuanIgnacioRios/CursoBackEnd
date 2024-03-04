import express from 'express';
import usersModel from '../dao/models/users.model.js'

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersModel.findOne({ email: email });
        if (!user) {
            return res.send('El usuario ingresado no existe');
        }
        if (user.password === password) {
            req.session.user = user;
            req.session.admin = true;
            res.redirect("/products");
        } else {
            res.send('Contraseña Incorrecta');
        }
    } catch (error) {
        console.error("Error al intentar iniciar sesión:", error);
        res.status(500).send("Error interno del servidor");
    }
});



router.post('/register', async (req, res) => {
    try{
        const { first_name, last_name, email, age, password, role } = req.body;
        let result = await usersModel.create({first_name, last_name, email, age, password, role})
        res.send({status: "Success", message: "Usuario creado con exito", payload: result})
    }catch(error){
        res.send({status: "error", error: error})
    }
})


router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/login')
})


export default router