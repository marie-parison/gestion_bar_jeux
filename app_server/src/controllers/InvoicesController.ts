import {Controller} from ".";
import {Request, Response, NextFunction} from "express";
import db from "../models";

export class InvoicesController extends Controller{

    static async getById(req: Request, res: Response, next: NextFunction) {
        const invoiceId = req.params.id;

        if(!invoiceId) {
            return res.status(500).json({error: 'No id given'});
        }

        let invoice = await db.Invoices.findById(invoiceId, {
            include: [
                {
                    model: db.Boards,
                    include: [{
                        model: db.Games,
                        include: [db.GamePictures]
                    }],
                },
                {
                    model: db.Foods,
                }
            ]
        });

        res.status(200).json(invoice);
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
