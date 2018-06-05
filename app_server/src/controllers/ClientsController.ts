import {Controller} from ".";
import {Request, Response, NextFunction} from "express";

export class ClientsController extends Controller{
    static getByEmail(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }

    static create(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }

    static updateById(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }

}
