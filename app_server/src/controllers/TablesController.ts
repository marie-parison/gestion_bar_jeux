import {Controller} from ".";
import {Request, Response, NextFunction} from "express";

export class TablesController extends Controller{
    static getAll(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }
}