import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import jwt, { ExtractJwt } from 'passport-jwt'
import UsersDAO from "../dao/users.mongo.js";
import { createHash, isValidPassword } from "../../utils.js";
import CartManager from '../services/CartManager.js';
import UserDTO from "../dao/dtos/user.dto.js";

const CartsManager = new CartManager();
const userService = new UsersDAO();

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async(req, username, password, done) => {

        const { first_name, last_name, email, age, role } = req.body

        try {
            let user = await userService.find({ email: username })
            if (user) {
                console.log('Usuario ya existe')
                return done(null, false)
            }

            let cartId = await CartsManager.addCart()
            cartId = cartId.payload._id

            let newUser = new UserDTO({first_name, last_name, email, age, password, role, cartId})
            let result = await userService.create(newUser)
            return done(null, result)
        } catch (error) {
            return done(`Error al obtener usuario ${error}`)
        }
    }))


    passport.use('login', new LocalStrategy({ usernameField: "email" }, async(username, password, done) => {
        try {
            const user = await userService.find({ email: username })
            if (!user) return done(null, false)
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))


    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.54e7c61d1223ea4c',
        clientSecret: '750897c7af6479df0cbeb804dd9f8cbb3b80c64b',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
    }, async(accessTocken, refreshToken, profile, done) => {
        try {
            let user = await userService.find({ email: profile._json.email })
            console.log(profile)
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 20,
                    email: profile._json.email,
                    password: '',
                }
                let createdUser = await userService.create(newUser)
                done(null, createdUser)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'JsonWebTokenSecret'
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        let user = await userService.find({id_: id})
        done(null, user)
    })
}

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['cookieToken']
    }
    return token
}

export default initializePassport