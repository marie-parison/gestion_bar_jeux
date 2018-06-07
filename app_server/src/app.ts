import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import {allowAccessHeader} from './middleware/allowAccess';

import db from "./models/";

import {
    boardsRouter,
    clientsRouter,
    invoicesRouter,
    tablesRouter,
    gamesRouter
} from "./routes";

const app = express();
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add headers
app.use(allowAccessHeader);

// pour pouvoir récupérer les données post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.sequelize.sync()
    .then(() => console.log('Connection successfull'))
    .catch((err: any) => console.error('Unable to connect to the database', err));

    

app.use('/tables', tablesRouter);
app.use('/clients', clientsRouter);
app.use('/invoices', invoicesRouter);
app.use('/boards', boardsRouter);
app.use('/games', gamesRouter);

module.exports = app;
