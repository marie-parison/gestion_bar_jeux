import {Router} from "express";
import {GamesController} from "../controllers";
const router = Router();

router.get('/', GamesController.getAll)
    .get('/:id', GamesController.getById)
    .post('/', GamesController.create)
    .put('/:id', GamesController.updateById)
    .delete('/:id', GamesController.deleteById);

export const gamesRouter = router;
