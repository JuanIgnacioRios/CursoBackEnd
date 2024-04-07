import usersData from "../persistence/usersData.js";

function getAllUsers(){
    return usersData.getAllUsers()
}

function createUser(newUser){
    usersData.createUser(newUser)
}

export default {getAllUsers, createUser}