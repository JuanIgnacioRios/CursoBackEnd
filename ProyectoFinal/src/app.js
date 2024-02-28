import express from 'express';
import mongoose from 'mongoose'
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js';

import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

// Configuración HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + '/views');
app.set('view engine', 'handlebars');


//Routes
app.use('/', viewsRouter)
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