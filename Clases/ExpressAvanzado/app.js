const express = require("express");

const app = express();
const PORT = 8080;

//Middlewae
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Endpoints

let users = []


app.get("/", (req,res) =>{
    res.json({
        msg: "Metodo GET"
    })
})

app.post("/api/user",(req,res) =>{
    let user = req.body

    if(!user.nombre || !user.apellido){
        return res.status(400).send({
            status: "Error",
            error: "Faltan campos"
        })
    }

    users.push(user)

    res.send({
        status: "Success",
        message: "Usuario creado"
    })
})

app.put("/api", (req,res) =>{
    res.json({
        msg: "Metodo PUT"
    })
})

app.delete("/api", (req,res) =>{
    res.json({
        msg: "Metodo DELETE"
    })
})



const frase = "Comision 50035 de CoderHouse"

app.get("/api/frase", (req,res) =>{
    res.json({ frase })
})

app.get("/api/palabras/:pos", (req,res) =>{
    const num = parseInt(req.params.pos);

    if(isNaN(num)){
        res.status(400).json({error:"El parametro no es un numero"})
    }else{
        const palabras = frase.split(" ");
        if(0 > num || num > palabras.length){
            res.status(400).json({error: "Esta fuera de rango"})
        }else{
            const palabra = palabras[num-1]
            res.json({palabra})
        }
    }
})




app.listen(PORT, () => console.log("Server running on port",PORT))