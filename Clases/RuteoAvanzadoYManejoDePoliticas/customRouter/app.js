import express from 'express'
import UsersRouter from './routes/users.js'

const app = express();
const port = 8080

const UserRouter = new UsersRouter();
app.use('/', UserRouter.getRouter())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})