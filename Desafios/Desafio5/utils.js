import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const PRIVATE_KEY = 'myprivatekey';

export const generateToken = (user) =>{
    return jwt.sign({ user }, PRIVATE_KEY)
} 

export const authToken = (req,  res, next) =>{
    const token = req.headers['authorization']
    if(token){
        jwt.verify(token, PRIVATE_KEY, (err, user) =>{
            if(err){
                res.sendStatus(403)
            }else{
                req.user = user
                next()
            }
        })
    }else{
        res.sendStatus(401)
    }
}