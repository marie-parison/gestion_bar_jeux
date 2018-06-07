import {Router} from "express";
import {BoardsController} from "../controllers";
const router = Router();

router.get('/', BoardsController.getAll)
    .get('/:id', BoardsController.getById)
    .post('/', BoardsController.create)
    .put('/:id', BoardsController.updateById)
    .delete('/:id', BoardsController.deleteById);

export const boardsRouter = router;
