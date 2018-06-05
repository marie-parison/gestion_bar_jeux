import {Router} from "express";
import {TablesController} from "../controllers";
const router = Router();

router.get('/', TablesController.getAll);

export const tablesRouter = router;