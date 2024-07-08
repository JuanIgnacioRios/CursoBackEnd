import express from 'express';
import PaymentService from '../services/PaymentService.js';
import ProductManager from '../services/ProductManager.js';

const ProductsManager = new ProductManager();

const router = express.Router();

router.post('/payment-intents', async (req, res) => {
    if(!req.body) return res.send({status: "error", error: "No hay productos para procesar la compra"});
    const products = req.body;
    let amount = 0
    for (const key of Object.keys(products)) {
        try {
          const product = await ProductsManager.getProductById(products[key]);
          amount = amount + product.payload[0].price
        } catch (error) {
          console.error(`Error al buscar el producto con id ${products[key]}:`, error);
        }
      }
    let paymentIntentInfo = {
        amount: amount * 100,
        currency: 'usd'
    }
    const service = new PaymentService()
    let result = await service.createPaymentIntent(paymentIntentInfo)
    res.send({status: "success", payload: result})
})

export default router