import {Controller} from ".";
import {Request, Response} from "express";
import db from "../models";

const include: any = [
    db.GamePictures,
    db.Editors,
    db.Authors,
    db.Contents,
    db.Mecanisms,
    db.Languages,
    db.Categories,
];

export class GamesController extends Controller{
    static prepareWhere(req: Request): any|null {
        const queries = req.query;

        let where = null;
        if(queries.name) {
            where = { $and : [{}] };

            // It's not a duplicate, for the moment we only have email, but in futur it cas have several queries
            if(queries.name) {
                where.$and.push({name: {$like: `%${queries.name}%`}});
            }
        }

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

        const where = GamesController.prepareWhere(req);
        if(where) {
            options["where"] = where;
        }

        try {
            let games = await db.Games.findAll(options);
            res.status(200).json(games);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    static async getById(req: Request, res: Response) {
        let options: any = { include };
        let id = req.params.id;

        try {
            let game = await db.Games.findById(id, options);
            res.status(200).json(game);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    /*
     * TODO: must improve this part
     * For include foreign relation data...
     * But not need for our app for this moment :)
     */
    static async create(req: Request, res: Response) {
        if(req.body) {
            try {
                let game = await db.Games.build(req.body).save();
                res.status(200).json(game);
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    static async deleteById(req: Request, res: Response) {
        let gameId = req.params.id;
        if(gameId) {
            try {
                let nbDeleted = await db.Games.destroy({ where: { id: gameId } });
                res.status(200).json({nbDeleted});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

    /*
     * TODO: must improve this part
     * For include foreign relation data...
     * But not need for our app for this moment :)
     */
    static async updateById(req: Request, res: Response) {
        let gameId = req.params.id;
        let gameData = req.body;
        if(gameId && gameData) {
            try {
                let nbUpdated = await db.Games.update(gameData, { where: { id: gameId } });
                res.status(200).json({nbUpdated});
            } catch (e) {
                res.status(500).json(e);
            }
        }
    }

}
