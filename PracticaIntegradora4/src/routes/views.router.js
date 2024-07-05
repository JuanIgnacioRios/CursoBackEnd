import express from 'express'
import {authToken} from '../../utils.js'
import viewsController from '../controllers/views.controller.js';

const router = express.Router();

router.get('/products', viewsController.renderProducts)
router.get('/login', viewsController.renderLogin)
router.get('/register', viewsController.renderRegister)
router.get('/cart/:id', viewsController.renderCart)
router.get('/forgetmypassword', viewsController.renderForgetMyPassword)
router.get('/reset-password', viewsController.renderResetPassword)
router.get('/uploadfiles', viewsController.uploadFiles)


export default router