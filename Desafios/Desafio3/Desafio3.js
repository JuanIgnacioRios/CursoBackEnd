const express = require("express");
const { ProductManager } = require("./ProductManager.js")


const app = express();
const PORT = 8080;

const ProductsManager = new ProductManager("./Productos.json");


//Middlewares
app.use(express.urlencoded({extended: true}))

//EndPoints
app.get('/products', async (req, res) =>{
    let {limit} = req.query;
    let productList = await ProductsManager.getProducts()
    if (limit) {
        return res.json(productList.splice(0,limit))
    }else{
        return res.json(productList)
    }

})

app.get('/products/:pid', async (req,res) =>{
    const product = await ProductsManager.getProductById(parseInt(req.params.pid));
    if(product){
      res.json(product)
    }else{
      res.send("No existe un producto con ese ID")
    }
})

app.listen(PORT, ()=> console.log("Servidor con express en el puerto",PORT))