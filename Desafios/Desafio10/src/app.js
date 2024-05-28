import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { addLogger } from './utils/logger.js';

import initializePassport from './config/passport.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js'
import mockingproductsRouter from './routes/mockingproducts.router.js'

import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Documentación API Ecommerce Coderhouse'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(addLogger)
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
app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)
app.use('/mockingproducts', mockingproductsRouter)
app.get('/loggerTest', (req, res) => {
    req.logger.fatal("Fatal")
    req.logger.error("error")
    req.logger.warning("warning")
    req.logger.info("info")
    req.logger.http("http")
    req.logger.debug("debug")
    res.send({ status: "success", message: "logger test done" })
})

//Mongoose Connection
mongoose.connect("mongodb+srv://JuanRios:1234562024@cluster0.qk3spmw.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la Base de Datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la Base de Datos", error)
    })


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})