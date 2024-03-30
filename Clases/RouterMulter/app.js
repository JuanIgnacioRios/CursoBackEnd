import express from "express";
import path from "path";
import multer from "multer";

import { fileURLToPath } from "url";
import { dirname } from "path";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(path.join(__dirname, "public")))

//Rutas
app.use('/',usersRouter)
app.use('/',petsRouter)

app.get('/', (req,res) => {
    //res.sendFile(path.join(__dirname, "public", "index.html"))
    res.sendFile(path.join(__dirname, "public", "uploadFiles.html"))
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, cb(null,path.join(__dirname,"./descargas")));
    },
    filename:(req, file, cb) => {
        const timeStamp = Date.now();
        const originalname = file.originalname;
        const ext = path.extname(originalname)
        cb(null, `${timeStamp}-${originalname}`)
    }
})

const upload = multer({storage})

app.post('/descargas', upload.single("archivo"), (req,res) =>{
    res.json({ message: "Archivo subido Correcamente" })
})



app.listen(PORT,() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})