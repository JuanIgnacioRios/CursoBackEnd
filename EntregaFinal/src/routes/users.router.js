import express from 'express';
import usersController from '../controllers/users.controller.js';
import { authToken } from '../../utils.js';
import { handleFiles } from '../middlewares/multer.middleware.js'

const router = express.Router();

//Endpoints
router.get('/', usersController.getUsers)
router.delete('/', usersController.deleteUnactiveUsers)
router.delete('/:uid', usersController.deleteUserById)
router.put('/premium/:uid', usersController.UpdateRole)
router.post('/changepassword/:uid', usersController.changePassword)
router.post('/:uid/documents', handleFiles, usersController.uploadFiles)

export default router