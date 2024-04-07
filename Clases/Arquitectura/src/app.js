import express from 'express'
import bodyParser from 'body-parser'
import toysRouter from './routes/toys.js'
import usersRouter from './routes/users.js'

const app = express()
const PORT = 8080;

app.use(bodyParser.json())

app.use('/toys', toysRouter);
app.use('/users',usersRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})