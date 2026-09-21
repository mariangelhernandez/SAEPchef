import {Router} from "express";
import {chefControllerController} from "../controllers/chefControllers.js"

const router = Router();

router.get('/chef', chefController.getAll);
router.post('/chef', chefController.create);
router.put('/chef:id', chefController.update);
router.patch('/chef:id', chefController.patch);
router.delete('/chef:id', chefController.delete);

export default router