import express from 'express'
import viewsController from '../controllers/views.controller';

const router = express.Router();

router.get('/products', viewsController.renderProducts)
router.get('/login', viewsController.renderLogin)
router.get('/register', viewsController.renderRegister)
router.get('/cart/:id', viewsController.renderCart)


export default router