import {Router} from "express";
import {ClientsController} from "../controllers";
const router = Router();

router
    .get('/', ClientsController.getAll)
    .post('/', ClientsController.create)
    .put('/:id', ClientsController.updateById)
    .delete('/:id', ClientsController.deleteById);

export const clientsRouter = router;
