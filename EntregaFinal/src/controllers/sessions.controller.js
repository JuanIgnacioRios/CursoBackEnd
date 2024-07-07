import passport from 'passport';
import { passportCall, authorization, transport } from '../../utils.js'
import {PORT} from '../app.js'
import jwt from 'jsonwebtoken';
import userService from "../dao/models/users.model.js";

async function login(req, res) {
    if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials " })
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        cart: req.user.cart
    }
    const email = req.user.email;
    const password = req.user.password;
    const role = req.user.role;
    let token = jwt.sign({ email, password, role }, 'JsonWebTokenSecret', { expiresIn: '24h' })
    res.cookie('cookieToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    res.redirect("/products")
}

async function faillogin(req, res) {
    res.send({ error: "failed login" })
}

async function register(req, res) {
    res.redirect('/login')
}

async function failregister(req, res) {
    res.send({ error: "failed register" })
}

async function githubCallBack(req, res) {
    req.session.user = req.user
    res.redirect("/products")
}

async function current(req, res) {
    res.send(req.user);
}

async function logout(req, res) {
    await userService.updateOne({_id: req.session.passport.user},{last_connection: Date.now()})
    req.session.destroy();
    res.redirect('/login')
}

async function sendResetPasswordEmail(req, res) {
    console.log(req.body)
    const email  = req.body.forgetpasswordemail
    try {
        let result = await userService.findOne({email})
        if(result){
            console.log(result)
            let token = jwt.sign({id: result._id, email:result.email, name: result.first_name}, 'JsonWebTokenSecret', { expiresIn: '1h' });
            let emailresponse = await transport.sendMail({
                from: "juaniganciorios2003@gmail.com",
                to: email,
                subject: "CoderhouseEcomm | Reestrablece tu contraseña",
                html:`
                <p>Hola! Como estas? <br></br> Espero puedas reestablecer tu contraseña <br></br></p>
                <a href=" http://localhost:${PORT}/reset-password?token=${token}">Hacelo haciendo click acá</a>
                `
            })
            res.send({status:"success", email: "Email Enviado!"})
        }else{
            res.send({status:"Error", error:"No existe usuario con ese mail"})
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', error: error });
    }
}

export default {
    login,
    faillogin,
    register,
    failregister,
    githubCallBack,
    current,
    logout,
    sendResetPasswordEmail
}