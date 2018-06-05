import {Router} from "express";
import {ClientsController} from "../controllers";
const router = Router();

router
    .get('/', ClientsController.getByEmail)
    .post('/', ClientsController.create)
    .put('/:id', ClientsController.updateById);

export const clientsRouter = router;
