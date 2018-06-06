import {Controller} from ".";
import {Request, Response, NextFunction} from "express";
import db from "../models";

export class ClientsController extends Controller{
    static prepareWhere(req: Request) {
        const queries = req.query;
        let where = null;
        if(Object.keys(queries).length > 0) {
            where = { $and : [{}] };
            where.$and.push({email: {$like: `%${queries.email}%`}});
        }
        return where;
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        const className = ClientsController;
        const options: any = {};

        const where = className.prepareWhere(req);
        if(where) {
            options["where"] = where;
        }

        try {
            let customers = await db.Customers.findAll(options);
            res.status(200).json(customers);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        if(req.body) {
            try {
                let customer = await db.Customers.build(req.body).save();
                res.status(200).json(customer);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async deleteById(req: Request, res: Response, next: NextFunction) {
        let clientId = req.params.id;
        if(clientId) {
            try {
                let nbDeleted = await db.Customers.destroy({ where: { id: clientId } });
                res.status(200).json({nbDeleted});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async updateById(req: Request, res: Response, next: NextFunction) {
        let clientId = req.params.id;
        let clientData = req.body;
        if(clientId && clientData) {
            // delete the email because it should not bw allowed to update
            delete clientData.email;
            try {
                let nbUpdated = await db.Customers.update(clientData, { where: { id: clientId } });
                res.status(200).json({nbUpdated});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

}
