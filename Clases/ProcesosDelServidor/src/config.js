import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGOURL,
    adminName: process.env.ADMINNAME,
    adminPassword: process.env.ADMINPASSWORD
}