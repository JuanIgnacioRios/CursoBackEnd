import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js';
import ProductManager from './service/ProductManager.js';

const app = express();
const PORT = 8080;

const p = new ProductManager("./src/files/products.json");


import { fileURLToPath } from "url";
import { dirname } from "path";

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

//Conexion socket.io

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer)


socketServer.on("connection" , async (socket) => {
    console.log("cliente conectado")

    try {
        const Products = await p.getProducts();
        socketServer.emit("products", Products);
    } catch (error) {
        socketServer.emit('response', { status: 'error', message: error.message });
    }

    
    socket.on("new-Product", async (newProduct) => {
        try {
            const objectProductNew = {
                    title: newProduct.title,
                    description: newProduct.description,
                    code: newProduct.code,
                    price: newProduct.price,
                    status: newProduct.status,
                    stock: newProduct.stock,
                    category: newProduct.category,
                    thumbnail: newProduct.thumbnail,
    
            }
            await p.addProduct(objectProductNew);
            const updatedListProd = await p.getProducts();
            socketServer.emit("products", updatedListProd);
            socketServer.emit("response", { status: 'success' , message: "Producto Agregado"});

        } catch (error) {
            socketServer.emit('response', { status: 'error', message: error.message });
        }
    })

    socket.on("delete-product", async(id) => {
        try {
            await p.deleteProduct(id)
            const Products = await p.getProducts()
            socketServer.emit("products", Products)
            socketServer.emit('response', { status: 'success' , message: "producto eliminado correctamente"});
        } catch (error) {
            socketServer.emit('response', { status: 'error', message: error.message });
        }
    } )

})
