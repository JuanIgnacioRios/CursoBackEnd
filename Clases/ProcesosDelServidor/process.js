import { Command } from 'commander'
import express from 'express'
import { fork } from 'child_process'

const program = new Command()

program
    .option('--mode', 'variable para desarrollo', "development")
    .option('-t', 'variable para testing', false)
    .option('-p', 'puerto del servidor', 8080)

program.parse()

//console.log(program.opts())
/*
process.on('exit', () => {
    console.log('Proceso finalizado')
})

process.on('beforeExit', () => {
    console.log('Proceso antes de terminar')
})

process.on('uncaughtException', (error) => {
    console.log('Error', error)
})

process.on('message', (msj) => {
    console.log('Message: ', msj)
})

process.exit()

*/

function listNumbers(...numbers) {
    const types = numbers.map(num => typeof num)
    if (types.some(type => type !== 'number')) {
        console.error('Parametros invalidos', types)
        process.exit(-4)
    }
}

process.on('exit', (code) => {
    if (code === -4) {
        console.log('Proceso con argumentos invalidos')
    }
})

/*
listNumbers(1, 2)

process.on('')
*/

const app = express();
const PORT = 8080;


function operacionCompleja() {
    let resultado = 0

    for (let i = 0; i < 100000; i++) {
        resultado += i
    }

    return resultado
}

app.get('/operacion', (req, res) => {
    const child = fork('./operacionCompleja.js')
    child.send('Calculo iniciado')
    child.on('message', result => {
        res.send(`Resultado es ${result}`)
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})