export const addProductErrorInfo = (product) => {
    return `Una o más propiedades estaban incompletas o no son validas.
    Lista de las propiedades requeridas:
    title: needs to be a String, recieved ${product.title}
    description: needs to be a String, recieved ${product.description}
    code: needs to be a String, recieved ${product.code}
    price: needs to be a Number, recieved ${product.price}
    category: needs to be a String, recieved ${product.category}`
}