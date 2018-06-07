import {Controller} from ".";
import {Request, Response, NextFunction} from "express";
import db from "../models";

const include: any = [
    {
        model: db.Boards,
        include: [{
            model: db.Games,
            include: [db.GamePictures]
        }]
    },
    db.Foods,
];

export class InvoicesController extends Controller{
    static prepareWhere(req: Request): any|null {
        const queries = req.query;

        let where = null;
        if(queries.email) {
            where = { $and : [{}] };

            // It's not a duplicate, for the moment we only have email, but in futur it cas have several queries
            if(queries.email) {
                where.$and.push({email: {$like: `%${queries.email}%`}});
            }
        }
        return where;
    }

    static async getAll(req: Request, res: Response) {
        let options: any = {include};
        const {limit, offset} = req.query;

        if(limit) {
            options["limit"] = parseInt(limit);
        }
        if(offset) {
            options["offset"] = parseInt(offset);
        }

        const where = InvoicesController.prepareWhere(req);
        if(where) {
            options["where"] = where;
        }

        try {
            let invoices = await db.Invoices.findAll(options);
            res.status(200).json(invoices);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async getById(req: Request, res: Response) {
        let options: any = { include };
        let id = req.params.id;

        try {
            let invoices = await db.Invoices.findById(id, options);
            res.status(200).json(invoices);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async create(req: Request, res: Response) {
        if(req.body) {
            try {
                let invoice = await db.Invoices.build(req.body).save();
                res.status(200).json(invoice);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async deleteById(req: Request, res: Response) {
        let invoiceId = req.params.id;
        if(invoiceId) {
            try {
                let nbDeleted = await db.Invoices.destroy({ where: { id: invoiceId } });
                res.status(200).json({nbDeleted});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async updateById(req: Request, res: Response) {
        let invoiceId = req.params.id;
        let invoiceData = req.body;
        if(invoiceId && invoiceData) {
            // delete the email because it should not bw allowed to update
            delete invoiceData.email;
            try {
                let nbUpdated = await db.Invoices.update(invoiceData, { where: { id: invoiceId } });
                res.status(200).json({nbUpdated});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async addBoardToInvoice(req: Request, res: Response) {
        let options = {include};
        let invoiceId = req.params.id_invoice;
        let boardId = req.params.id_board;

        try {
            let invoice = await db.Invoices.findById(invoiceId, options);
            let board = await db.Boards.findById(boardId);
            if(!board.available) {
                return res.status(500).json({message: "Board not available"});
            }
            await invoice.addBoard(board);
            await board.update({available: false});
            res.status(200).json(invoice);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async deleteBoardFromInvoice(req: Request, res: Response) {
        let options = {include};
        let invoiceId = req.params.id_invoice;
        let boardId = req.params.id_board;

        try {
            let invoice = await db.Invoices.findById(invoiceId, options);
            let board = await db.Boards.findById(boardId);
            // console.log(invoice.boards);
            
            await invoice.removeBoard(board);
            await board.update({available: true});
            res.status(200).json(invoice);
        } catch (e) {
            console.log(e);
            
            res.status(500).json(e);
        }
    }


}
