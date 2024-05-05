import winston from "winston";
import dotenv from 'dotenv'

dotenv.config()

const LevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
}


const loggerDev = winston.createLogger({
    levels: LevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.simple()
        })
    ]
})

const loggerProd = winston.createLogger({
    levels: LevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.simple()
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.simple()
        })
    ]
})

export const addLogger = (req, res, next) => {
    const env = process.env.ENV || "development"
    console.log(env)
    req.logger = env === "production" ? loggerProd : loggerDev;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}