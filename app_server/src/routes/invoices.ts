import {Router} from "express";
import {InvoicesController} from "../controllers";
const router = Router();

router
    .get('/:id', InvoicesController.getById)
    .post('/', InvoicesController.create)
    .put('/:id_invoice/boards/:id_board', InvoicesController.updateBoardFromInvoiceById)
    .post('/:id_invoice/boards/:id_board', InvoicesController.addBoardToInvoice);

export const invoicesRouter = router;
