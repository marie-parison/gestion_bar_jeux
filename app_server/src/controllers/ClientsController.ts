import {Controller} from ".";
import {Request, Response, NextFunction} from "express";
import db from "../models";

export class ClientsController extends Controller{
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
        let options: any = {};
        const {limit, offset} = req.query;

        if(limit) {
            options["limit"] = parseInt(limit);
        }
        if(offset) {
            options["offset"] = parseInt(offset);
        }

        const where = ClientsController.prepareWhere(req);
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

    static async getById(req: Request, res: Response) {
        let id = req.params.id;

        try {
            let customers = await db.Customers.findById(id);
            res.status(200).json(customers);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async create(req: Request, res: Response) {
        if(req.body) {
            try {
                let customer = await db.Customers.build(req.body).save();
                res.status(200).json(customer);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async deleteById(req: Request, res: Response) {
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

    static async updateById(req: Request, res: Response) {
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
