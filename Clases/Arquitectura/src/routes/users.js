import express  from "express";
import usersControllers from "../controllers/usersControllers.js";

const router = express.Router();

router.get('/', usersControllers.getAllUsers)
router.post('/',usersControllers.createUser)

export default router