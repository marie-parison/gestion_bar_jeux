import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import db from "./models/";

import {
    boardsRouter,
    clientsRouter,
    invoicesRouter,
    tablesRouter
} from "./routes";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.sequelize.sync()
    .then(() => console.log('Connection successfull'))
    .catch((err: any) => console.error('Unable to connect to the database', err));

app.use('/tables', tablesRouter);
app.use('/clients', clientsRouter);
app.use('/invoices', invoicesRouter);
app.use('/boards', boardsRouter);

module.exports = app;
