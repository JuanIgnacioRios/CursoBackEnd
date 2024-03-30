import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routes/user.router.js'

const app = express();
const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

app.use(express.json())

mongoose.connect("mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/CoderDB?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la Base de Datos")
})
.catch(error =>{
    console.error("Error al conectarse a la Base de Datos", error)
})

app.use("/api/users",userRouter)
