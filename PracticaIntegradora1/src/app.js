import express from 'express';
import mongoose from 'mongoose'
import http from 'http';
import path from 'path';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import { fileURLToPath } from "url";
import { dirname } from "path";

import fsProductsRouter from './routes/fs.products.router.js'
import fsCartsRouter from './routes/fs.carts.router.js'
import mdbProductsRouter from './routes/mdb.products.router.js'
import mdbCartsRouter from './routes/mdb.carts.router.js'
import messagesModel from './dao/MongoDB/models/messages.model.js';


const app = express();
const PORT = 8080;
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views")
app.set('views engine', 'handlebars')
app.use(express.static(__dirname + "/views"))
app.use(express.static(path.join(__dirname,'public')))


//Routes
app.get("/", (req,res) => {res.render("chat.handlebars")})
app.use('/api/filesystem/products', fsProductsRouter)
app.use('/api/filesystem/cart', fsCartsRouter)
app.use('/api/mongo/products', mdbProductsRouter)
app.use('/api/mongo/cart', mdbCartsRouter)


//Mongoose Connection
mongoose.connect("mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la Base de Datos")
})
.catch(error =>{
    console.error("Error al conectarse a la Base de Datos", error)
})


const users = {}

//Socket.io

io.on("connection", (socket)=>{
    console.log("un usuario se ha conectado")
    socket.on("newUser",(user) =>{
        users[socket.id] = user
        io.emit('userConnected', user.username)
    })

    //El usuario emite un mensaje
    socket.on("chatMessage", async (message)=>{
        const user = users[socket.id]
        await messagesModel.create({ user: user.email, message: message })
        io.emit('message',{user, message})
    })

    socket.on('disconnect', ()=>{
            const username = users[socket.id]
            delete users[socket.id]
            io.emit("userDisconnected", username)
    })
})

server.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

