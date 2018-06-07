import {Router} from "express";
import {InvoicesController} from "../controllers";
const router = Router();

router
    .get('/', InvoicesController.getAll)
    .get('/:id', InvoicesController.getById)
    .post('/', InvoicesController.create)
    .put('/:id', InvoicesController.updateById)
    .delete('/:id', InvoicesController.deleteById)
    .post('/:id_invoice/boards/:id_board', InvoicesController.addBoardToInvoice)
    .delete('/:id_invoice/boards/:id_board', InvoicesController.deleteBoardFromInvoice);

export const invoicesRouter = router;
