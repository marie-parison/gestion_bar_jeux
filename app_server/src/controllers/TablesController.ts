import {Controller} from ".";
import {Request, Response, NextFunction} from "express";
import db from "../models";

const include: any = {
    model: db.Invoices,
    // include: [db.GamePictures]
};
export class TablesController extends Controller{
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let tables = await db.Tables.findAll();

            for(let i = 0; i < tables.length; i++) {
                if(!tables[i].available) {
                    let invoice = await db.Invoices.findOne({
                        where: { id_table: tables[i].id, is_paid: false },
                        order: [['id', 'DESC']]
                    });
                    let data = invoice ? invoice : null;
                    tables[i].setDataValue('invoice', data);
                } else {
                    tables[i].setDataValue('invoice', null);
                }
            }
            res.status(200).json(tables);
        } catch (e) {
            console.error(e);
            return res.status(500).json(e);
        }
    }
    static prepareWhere(req: Request): any|null {
        const queries = req.query;
        let where = null;
        return where;
    }

    static async getAlll(req: Request, res: Response) {
        let options: any = {include};
        const {limit, offset} = req.query;

        if(limit) {
            options["limit"] = parseInt(limit);
        }
        if(offset) {
            options["offset"] = parseInt(offset);
        }

        const where = TablesController.prepareWhere(req);
        if(where) {
            options["where"] = where;
        }

        try {
            let tables = await db.Tables.findAll(options);
            res.status(200).json(tables);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async getById(req: Request, res: Response) {
        let id = req.params.id;

        try {
            let tables = await db.Tables.findById(id);
            res.status(200).json(tables);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async create(req: Request, res: Response) {
        if(req.body) {
            try {
                let table = await db.Tables.build(req.body).save();
                res.status(200).json(table);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async deleteById(req: Request, res: Response) {
        let tableId = req.params.id;
        if(tableId) {
            try {
                let nbDeleted = await db.Tables.destroy({ where: { id: tableId } });
                res.status(200).json({nbDeleted});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async updateById(req: Request, res: Response) {
        let tableId = req.params.id;
        let tableData = req.body;
        if(tableId && tableData) {
            // delete the email because it should not bw allowed to update
            delete tableData.email;
            try {
                let nbUpdated = await db.Tables.update(tableData, { where: { id: tableId } });
                res.status(200).json({nbUpdated});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }
}