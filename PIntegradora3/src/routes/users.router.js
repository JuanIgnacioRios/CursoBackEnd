import express from 'express';
import usersController from '../controllers/users.controller.js';

const router = express.Router();

//Endpoints

router.put('/premium/:uid', usersController.UpdateRole)

export default router