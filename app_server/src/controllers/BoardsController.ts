import {Controller} from ".";
import {Request, Response, NextFunction} from "express";

export class BoardsController extends Controller{
    static getAll(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({});
    }
}
