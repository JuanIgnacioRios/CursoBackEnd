import express from 'express';
import usersController from '../controllers/users.controller.js';
import { authToken } from '../../utils.js';

const router = express.Router();

//Endpoints

router.put('/premium/:uid',authToken, usersController.UpdateRole)
router.post('/changepassword/:uid', usersController.changePassword)

export default router