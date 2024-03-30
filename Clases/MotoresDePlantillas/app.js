import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/views')));

// Configuración HandleBars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

const users = [{
    nombre: "Juani",
    apellido: "Rios",
    edad: 20,
    correo: "jaunirios@gmail.com",
    telefono: 1123344556
},{
    nombre: "Juani2",
    apellido: "Rios",
    edad: 20,
    correo: "jaunirios@gmail.com",
    telefono: 1123344556
},{
    nombre: "Juani3",
    apellido: "Rios",
    edad: 20,
    correo: "jaunirios@gmail.com",
    telefono: 1123344556
},{
    nombre: "Juani4",
    apellido: "Rios",
    edad: 20,
    correo: "jaunirios@gmail.com",
    telefono: 1123344556
},{
    nombre: "Juani5",
    apellido: "Rios",
    edad: 20,
    correo: "jaunirios@gmail.com",
    telefono: 1123344556
}]


let food = [
    {nombre: "tortilla", precio: 1000},
    {nombre: "papas bravas", precio: 1200},
    {nombre: "croquetas", precio: 800},
    {nombre: "pan con tomate", precio: 2000},
    {nombre: "sandwich granjero", precio: 3000}
]

/*
app.get('/', (req, res) => {
    const random = Math.floor(Math.random() * users.length)
    res.render('index', users[random]);
});
*/

app.get('/', (req, res) => {

    let usuario = {
        nombre: "Juani",
        apellido: "Rios",
        role: "admin"
    }

    res.render("index", {
        usuario,
        isAdmin: usuario.role === "admin",
        food
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
