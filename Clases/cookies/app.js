import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;


app.get('/set-cookie', (req, res)=>{
    res.cookie('miCookie', 'valorCookie', {maxAge: 10000})
    res.send('cookie establecida')
})

app.get('/get-cookie', (req, res)=>{
    const miCookie = req.cookies.miCookie
    res.send(miCookie)
})

app.get('/clear-cookie', (req, res)=>{
    res.clearCookie('miCookie')
    res.send('CookieEliminada')
})


const firmaSecreta = 'miClaveSecreta'
app.use(cookieParser(firmaSecreta))

app.get('/set-signed-cookie', (req, res)=>{
    res.cookie('miCookieFirmada', 'valorCookieFirmada',{signed: true})
    res.send('Cookie firmada establecida')
})

app.get('/get-signed-cookie', (req, res)=>{
    const miCookieFirmada = req.cookies.miCookieFirmada
    if(miCookieFirmada){
        res.send(`El valor de la cookie firmada es ${miCookieFirmada}`)
    }else{
        res.send(`NO hay valor establecido en cookie`)
    }
})

app.get('/clear-signed-cookie', (req, res)=>{
    res.clearCookie('miCookieFirmada')
    res.send('cookie eliminada')
})

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} port`)
})