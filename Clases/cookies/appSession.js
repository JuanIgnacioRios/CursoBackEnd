import express from 'express';
import session from 'express-session';

const app = express();
const PORT = 8080;

app.use(session({
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}))

app.get('/session', (req, res) =>{
    if(req.session.counter){
        req.session.counter++        
        res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
    }else{
        req.session.counter = 1
        res.send('Bienvenido')
    }
})


app.get('/logout', (req, res)=>{
    req.session.destroy(err =>{
        if(!err) res.send('Sesión finalizada')
        else res.send({status: "No se puedo finalizar sesión", body: err})
    })
})


function auth(req, res, next){
    if(req.session?.user === 'coder' && req.session?.admin){
        return next()
    }
    return res.status(401).send("error de autenticacion")
}

app.get('/login', (req, res)=>{
    const {username, password} = req.query
    if(username !== "coder" || password !== "house"){
        return res.send('inicio de sesión invalido')
    }

    req.session.user = username
    req.session.admin = true
    res.send('Inicio de sesion exitoso')
})

app.get('/privado', auth, (req, res) => {
    res.send('Ya estas logeaod y sos admin')
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

