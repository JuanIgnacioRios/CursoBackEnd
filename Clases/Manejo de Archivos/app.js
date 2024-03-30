const fs = require("fs")

/*
readFileSync (leer archivo)
writeFileSync (escribir archivo)
appendFileSync (actualizacion de archivo)
unlinkSync (borrado de archivo)
mkdirSync(crear carpeta)
*/

/*
const data = "Contenido para escribir el archivo"

try{
    fs.writeFileSync("miArchivo.txt", data)
}catch(error){
    console.log("Error al escribir el archivo", error)
}
*/

/*
try{
    const data = fs.readFileSync("miArchivo.txt","utf8")
    console.log("Contenido de mi archivo: ",data)
}catch(error){
    console.log("Error al leer ele archivo: ",error)
}


const dataAdicional = "Datos agregados en el archivo"

try{
    fs.appendFileSync("miArchivo.txt", dataAdicional)
}catch(error){
    console.log("Error al agregar informacion: ",error)
}



try{
    fs.unlinkSync("miArchivo.txt")
    console.log("Archivo eliminado")
}catch(error){
    console.log("Error al eliminar el archivo: ",error)
}


try{
    fs.mkdirSync("Archivos de texto")
    console.log("Directorio creado correctamente")
}catch(error){
    console.log("Error al crear carpeta: ",error)
}

*/

async function readFile(){
    try{
        const data = await fs.promises.readFile("miArchivo.txt","utf8")
        console.log("Contenido de mi archivo: ",data)
    }catch(error){
        console.log("Error al leer ele archivo: ",error)
    }
}

readFile()