import toysService from "../services/toysService.js"


//Obtener todos los juguetes
function getAllToys(req,res){
    const toys = toysService.getAllToys()
    res.json(toys)
}

//Crear un nuevo juguete
function createToy(req,res){
    const newToy = req.body
    toysService.createToy(newToy)
    res.status(201).json(newToy)
}

export default {getAllToys, createToy}