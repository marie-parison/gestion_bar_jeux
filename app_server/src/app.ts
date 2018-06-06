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

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

db.sequelize.sync()
    .then(() => console.log('Connection successfull'))
    .catch((err: any) => console.error('Unable to connect to the database', err));

app.use('/tables', tablesRouter);
app.use('/clients', clientsRouter);
app.use('/invoices', invoicesRouter);
app.use('/boards', boardsRouter);

module.exports = app;
