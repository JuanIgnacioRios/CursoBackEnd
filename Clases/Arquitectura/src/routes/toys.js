import express  from "express";
import toysControllers from "../controllers/toysControllers.js";

const router = express.Router();

router.get('/', toysControllers.getAllToys)
router.post('/',toysControllers.createToy)

export default router