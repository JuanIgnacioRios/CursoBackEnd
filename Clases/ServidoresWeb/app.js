/*const http = require("http")

const server = http.createServer((req,res) =>{
    res.end("Mi primer servidor con un modulo nativo")
})

server.listen(8080, ()=>{
    console.log("Servidor escuchando en el puerto 8080")
})*/

//Utilzar Express JS. 
// Requiere que se instale en todos los proyectos en los que se trabaje
// 1. npm install express

const express = require("express")

const app = express()

const PORT = 8080

//Endpoints
app.get('/bienvenida',(req,res)=>{
    const htmlRespuesta = '<p style="color: blue">Bienvenido!</p>'
    res.send(htmlRespuesta)
})

app.get('/usuarios',(req,res)=>{
    const usuario = {
        nombre: "Juani",
        apellido: "Rios",
        correo: "juanirios@wave.com"
    }

    res.json(usuario)
})

app.get('/parametro/:nombre', (req, res) =>{
    console.log(req.params.nombre)
    res.send(`Bienvenido Usuario ${req.params.nombre}`)
})


const usuarios = [
    {id: 1, nombre:"a", apellido:"a"},
    {id: 2, nombre:"B", apellido:"B"},
    {id: 3, nombre:"c", apellido:"c"},
]

app.get("/", (req, res) =>{
    res.json(usuarios)
})

app.get("/:userId", (req, res) =>{
    const IdUsuario = req.params.userId

    let usuario = usuarios.find(u => u.id == IdUsuario)
    if(!usuario) return res.send({error: "Usuario no encontrado"})
    res.send(usuario)
})

app.listen(PORT, ()=> console.log("Servidor con express en el puerto",PORT))