import usersService from "../services/usersService.js"

//Obtener todos los usuarios
function getAllUsers(req,res){
    const users = usersService.getAllUsers()
    res.json(users)
}

function createUser(req,res){
    const newUser = req.body
    usersService.createUser(newUser)
    res.status(201).json(newUser)
}

export default {getAllUsers, createUser}