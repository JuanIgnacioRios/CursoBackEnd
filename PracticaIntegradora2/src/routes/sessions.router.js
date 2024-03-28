import express from 'express';
import usersModel from '../dao/models/users.model.js'
import {createHash, isValidPassword} from '../../utils.js'
import passport from 'passport';
const router = express.Router();

router.post('/login',passport.authenticate('login', {failureRedirect:'/faillogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status: "error", error: "Invalid credentials "})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.redirect("/products")
});

router.get('/faillogin', async(req, res) =>{
    res.send({error: "failed login"})    
})


router.post('/register',passport.authenticate('register',{failureRedirect:'/failregister'}), async (req, res) => {
    res.redirect('/login')
})

router.get('/failregister', async(req, res) =>{
    res.send({error: "failed register"})    
})

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res) =>{ })

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) =>{
    req.session.user = req.user
    res.redirect("/products")
})


router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/login')
})


export default router