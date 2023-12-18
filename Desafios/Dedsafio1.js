class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!this.products.find(product => product.code === code) && title && description && price && thumbnail && code && stock) {
            const newProduct = {
                id: this.products.length + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.products.push(newProduct);
        } else {
            console.log("El producto que se quiere agregar cuenta con un código ya existente en la lista de productos o no cuenta con todos los campos.");
        }
    }

    getProducts() {
        this.products.forEach(product => {
            console.log(product);
        });
    }

    getProductById(pid) {
        let result = this.products.find(product => product.id === pid);
        return result ? console.log(result) : console.log('Not found');
    }
}

//Proceso de Testing

const Products1 = new ProductManager();

Products1.getProducts();

Products1.addProduct({ title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 });

Products1.getProducts();

Products1.addProduct({ title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25 });

Products1.getProductById(1);

Products1.getProductById(2);