//Actividad de Clase
/*
let Numeros = {};

for (let i = 0; i < 10000; i++) {
    const keys = Object.keys(Numeros);
    const numero = Math.floor(Math.random() * 21);

    if (keys.includes(numero.toString())) {
        Numeros[numero]++;
    } else {
        Numeros[numero] = 1;
    }
}
console.log(Numeros)
*/


const fs = require("fs/promises");
const crypto = require("crypto");

class UserManager{
    constructor(){
        this.filePath = "./Usuarios.json"
    }

    async createUser(User){
        const {nombre, apellido, username, password} = User
    
        //Hashear la contraseña
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
        
        try{
            //cargar los usuarios de un arhivo creado
            let users = []
            if( await fs.access(this.filePath).then(()=> true).catch(()=>false)){
                const fileContent = await fs.readFile(this.filePath, "utf8")
                users = JSON.parse(fileContent)
            }
            
            users.push({nombre, apellido, username, password: hashedPassword})

            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))
        } catch(error){
           console.error("Error al crear el usuario ",error) 
        }
    }

    async validateUser(username, password){
        try {
            if( await fs.access(this.filePath).then(()=> true).catch(()=>false)){
                const fileContent = await fs.readFile(this.filePath,"utf8")
                const users = JSON.parse(fileContent)

                const user = users.find(u => u.username === username)

                if(user){
                    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

                    if(hashedPassword === user.password){
                        console.log("Loggeado")
                    }else{console.log("contraseña incorrecta")}
                }else(console.log("El usuario no fue encontrado"))
            }else{
                console.log("No hay usuarios registrados")
            }
        } catch (error) {
            console.log("Error de validacion", error)
        }
    }

}


const userManager = new UserManager()

userManager.createUser({
    nombre: "Juani",
    apellido: "Rios",
    username: "juanirios_",
    password: "boca2003"
}).then(()=>{
    userManager.validateUser("juanirios","boca2003")
})