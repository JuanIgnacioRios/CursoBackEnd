import toysData from '../persistence/toysData.js'

function getAllToys(){
    return toysData.getAllToys()
}

function createToy(newToy){
    toysData.createToy(newToy)
}

export default {getAllToys, createToy}