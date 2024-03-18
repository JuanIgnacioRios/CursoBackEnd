import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import initializePassport from './config/passport.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js'

import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/sessiones?retryWrites=true&w=majority",
        /* mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, */
        ttl: 15
    }),
    secret: "1234562024",
    resave: false,
    saveUninitialized: false
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Configuración HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + '/views');
app.set('view engine', 'handlebars');


//Routes
app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)

//Mongoose Connection
mongoose.connect("mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la Base de Datos")
})
.catch(error =>{
    console.error("Error al conectarse a la Base de Datos", error)
})


app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})