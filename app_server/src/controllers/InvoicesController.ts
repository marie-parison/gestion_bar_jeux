import {Controller} from ".";
import {Request, Response, NextFunction} from "express";

export class InvoicesController extends Controller{

    static getById(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }

    static create(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }

    static updateBoardFromInvoiceById(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }

    static addBoardToInvoice(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }

}
