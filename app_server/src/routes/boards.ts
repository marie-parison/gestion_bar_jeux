import {Router} from "express";
import {BoardsController} from "../controllers";
const router = Router();

router.get('/', BoardsController.getAll);

export const boardsRouter = router;
