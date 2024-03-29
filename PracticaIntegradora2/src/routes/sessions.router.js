import express from 'express';
import usersModel from '../dao/models/users.model.js'
import { createHash, isValidPassword } from '../../utils.js'
import passport from 'passport';
import { passportCall, authorization } from '../../utils.js'
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async(req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials " })
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    const email = req.user.email;
    const password = req.user.password;
    const role = req.user.role;
    let token = jwt.sign({ email, password, role }, 'JsonWebTokenSecret', { expiresIn: '24h' })
    res.cookie('cookieToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    res.redirect("/products")
});

router.get('/faillogin', async(req, res) => {
    res.send({ error: "failed login" })
})


router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async(req, res) => {
    res.redirect('/login')
})

router.get('/failregister', async(req, res) => {
    res.send({ error: "failed register" })
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async(req, res) => {})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async(req, res) => {
    req.session.user = req.user
    res.redirect("/products")
})

router.get('/current', passportCall('jwt'), authorization('user'), (req, res) => {
    res.send(req.user);
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login')
})


export default router