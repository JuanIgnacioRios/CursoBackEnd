import { createHash } from "../../../utils.js"

class UserDTO{
    constructor({first_name,last_name,email,age,password,role,cart}){
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.age = age,
        this.password = createHash(password),
        this.role = role,
        this.cart = cart
    }
}

export default UserDTO