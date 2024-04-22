class ProductDTO{
    constructor({title, description, code, price, status, stock, category, thumbnails}){
        let thumbnailsArray = thumbnails ? [thumbnails] : [];  
        this.title = title,
        this.description = description,
        this.code = code,
        this.price = price,
        this.status = status || true,
        this.stock = stock,
        this.category = category,
        this.thumbnails = thumbnailsArray
    }
}

export default ProductDTO