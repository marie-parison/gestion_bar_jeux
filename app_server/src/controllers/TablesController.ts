import {Controller} from ".";
import {Request, Response, NextFunction} from "express";
import db from "../models";

export class TablesController extends Controller{
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let tables = await db.Tables.findAll();

            for(let i = 0; i < tables.length; i++) {
                if(!tables[i].available) {
                    let invoice = await db.Invoices.findOne({
                        where: { id_table: tables[i].id, is_paid: false }
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
}