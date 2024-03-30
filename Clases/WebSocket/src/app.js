import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js'


const app = express();
const PORT = 8080;



import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// Configuración HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

//Conexion con socket.io

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer)


app.use('/', viewsRouter)


socketServer.on('connection', socket => {
    socket.on('mensaje', data =>{
        socket.emit("mensaje", data)
    })
})
