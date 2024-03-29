import bcrypt from 'bcrypt'
import passport from 'passport'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)
export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(error, user, info) {
            if (error) return next(error);
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
            }
            req.user = user
            next()
        })(req, res, next)
    }
}
export const authorization = (role) => {
    return async(req, res, next) => {
        if (!req.user) return res.status(401).send({ error: "Unauthorized" })
        if (req.user.role != role) return res.status(403).send({ error: "No permissions" })
        next()
    }
}