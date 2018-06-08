import {Router} from "express";
import {BoardsController} from "../controllers";
const router = Router();

router.get('/', BoardsController.getAll)
    .get('/:id', BoardsController.getById)
    .post('/:id/free', BoardsController.AvailableBoardById)
    .post('/:id/remove', BoardsController.notAvailableBoardById)
    .post('/', BoardsController.create)
    .put('/:id', BoardsController.updateById)
    .delete('/:id', BoardsController.deleteById);

export const boardsRouter = router;
