import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';


const app = express();
const server = http.createServer(app);
const io = new Server(server)

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Configurar handlebars
app.engine('handlebars', handlebars.engine())
//Carpeta views para vistas
app.set('views', __dirname + "/views")
//Usa handlebars como motor de plantilla
app.set('views engine', 'handlebars')
//Usa los archivos dentro de la carpeta vistas
app.use(express.static(__dirname + "/views"))
//Usamos los archivos de la carpeta public
app.use(express.static(path.join(__dirname,'public')))

//Ruta principal
app.get("/", (req,res) => {
    res.render("index.handlebars")
})


const users = {}

//Socket.io

io.on("connection", (socket)=>{
    console.log("un usuario se ha conectado")
    socket.on("newUser",(username) =>{
        users[socket.id] = username
        io.emit('userConnected', username)
    })

    //El usuario emite un mensaje
    socket.on("chatMessage", (message)=>{
        const username = users[socket.id]
        io.emit('message',{username, message})
    })

    socket.on('disconnect', ()=>{
            const username = users[socket.id]
            delete users[socket.id]
            io.emit("userDisconnected", username)
    })
})


const PORT = 8080
server.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
})