let users = []

export default {
    getAllUsers: ()=>users,
    createUser: (newUser)=>{
        users.push(newUser)
    }
}