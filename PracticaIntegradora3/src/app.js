import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors'
import http from 'http';
import { Server } from 'socket.io'

import initializePassport from './config/passport.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js'

import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

//Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
initializePassport()
app.use(passport.initialize())
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/sessiones?retryWrites=true&w=majority",
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 15
    }),
    secret: "1234562024",
    resave: false,
    saveUninitialized: false
}))

// Configuración HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + '/views');
app.set('view engine', 'handlebars');


//Routes
app.use('/', passport.authenticate('jwt', { session: false }), viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', passport.authenticate('jwt', { session: false }), productsRouter)
app.use('/api/cart', passport.authenticate('jwt', { session: false }), cartsRouter)

//Mongoose Connection
mongoose.connect("mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la Base de Datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la Base de Datos", error)
    })


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})


const io = new Server(server)

const users = {}

io.on("connection", (socket) => {
    console.log("un usuario se ha conectado")
    socket.on("newUser", (username) => {
        users[socket.id] = username
        io.emit('userConnected', username)
    })

    //El usuario emite un mensaje
    socket.on("chatMessage", (message) => {
        const username = users[socket.id]
        io.emit('message', { username, message })
    })

    socket.on('disconnect', () => {
        const username = users[socket.id]
        delete users[socket.id]
        io.emit("userDisconnected", username)
    })
})