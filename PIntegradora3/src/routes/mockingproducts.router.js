import express from 'express'
import { generateProducts } from '../../utils.js';


const router = express.Router();

router.get('/', async(req, res) => {
    let products = []
    for (let index = 0; index < 100; index++) {
        products.push(generateProducts())
    }
    res.send({ status: "success", payload: products })
})

export default router