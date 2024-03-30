const suma = (num1, num2) =>{
    return new Promise((res, rej) => {
        if (num1 === 0 || num2 === 0){
            rej('Operacion innecesaria')
        }else if((num1 + num2) < 0){
            rej('La calculadora solo devuelve valores positivos')
        }else{
            res(num1 + num2)
        }
    })
}

const resta = (num1, num2) => {
    return new Promise((res,rej) => {
        if(num1 == 0 || num2 == 0){
            rej('Operacion Invalida')
        }else if((num1 - num2) < 0){
            rej('La calculadora solo devuelve valores positivos')
        }else{
            res(num1 - num2)
        }
    })
}

const multiplicacion = (num1, num2) => {
    return new Promise ((res, rej) => {
        if(num1 < 0 || num2 < 0){
            rej('Operacion Invalida')
        }else if ((num1 * num2) < 0){
            rej('La calculadora solo devuelve valores positivos')
        }else{
            res(num1 * num2)
        }
    })
}

const division = (num1, num2) => {
    return new Promise ((res, rej) => {
        if(num2 === 0){
            rej('Operacion Invalida')
        }else{
            res(num1 / num2)
        }
    })
}


const calculos = async () =>{
    try{
        numero1 = 5
        numero2 = 3
        resultadoSuma = await suma(numero1,numero2)
        console.log(resultadoSuma)
        numero1 = 6
        numero2 = 2
        resultadoResta = await resta(numero1,numero2)
        console.log(resultadoResta)
        numero1 = 30
        numero2 = -2
        resultadoMult = await multiplicacion(numero1,numero2)
        console.log(resultadoMult)
    }catch(error){
        console.log(error)
    }
}


calculos()