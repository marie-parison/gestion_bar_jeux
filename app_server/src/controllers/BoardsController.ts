import {Controller} from ".";
import {Request, Response} from "express";
import db from "../models";

const include: any = [
    {
        model: db.Games,
        include: [db.GamePictures]
    },
    {
        model: db.Invoices,
        order: [['id', 'DESC']],
        include: db.Tables,
    }
];

export class BoardsController extends Controller{
    static prepareWhere(req: Request): any|null {
        const queries = req.query;

        let where = null;
/*        if(queries.email) {
            where = { $and : [{}] };

            // It's not a duplicate, for the moment we only have email, but in futur it cas have several queries
            if(queries.email) {
                where.$and.push({email: {$like: `%${queries.email}%`}});
            }
        }*/

        return where;
    }

    static async getAll(req: Request, res: Response) {
        let options: any = { include };
        const {limit, offset} = req.query;

        if(limit) {
            options["limit"] = parseInt(limit);
        }
        if(offset) {
            options["offset"] = parseInt(offset);
        }

        const where = BoardsController.prepareWhere(req);
        if(where) {
            options["where"] = where;
        }

        try {
            let boards = await db.Boards.findAll(options);
            res.status(200).json(boards);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async getById(req: Request, res: Response) {
        let options: any = { include };
        let id = req.params.id;

        try {
            let board = await db.Boards.findById(id, options);
            res.status(200).json(board);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async create(req: Request, res: Response) {
        if(req.body) {
            try {
                let board = await db.Boards.build(req.body).save();
                res.status(200).json(board);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async deleteById(req: Request, res: Response) {
        let boardId = req.params.id;
        if(boardId) {
            try {
                let nbDeleted = await db.Boards.destroy({ where: { id: boardId } });
                res.status(200).json({nbDeleted});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async updateById(req: Request, res: Response) {
        let boardId = req.params.id;
        let boardData = req.body;
        if(boardId && boardData) {
            // delete the email because it should not bw allowed to update
            delete boardData.email;
            try {
                let nbUpdated = await db.Boards.update(boardData, { where: { id: boardId } });
                res.status(200).json({nbUpdated});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async AvailableBoardById(req: Request, res: Response) {
        let boardId = req.params.id;

        if(boardId) {
            // delete the email because it should not bw allowed to update
            try {
                let board = await db.Boards.findById(boardId);
                board.setInvoices(null);
                await board.update({available: true});
                board = await db.Boards.findById(boardId);
                res.status(200).json(board);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async notAvailableBoardById(req: Request, res: Response) {
        let boardId = req.params.id;
        if(boardId) {
            try {
                let board = await db.Boards.findById(boardId);
                await board.update({available: false});
                board = await db.Boards.findById(boardId);
                res.status(200).json(board);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

}
