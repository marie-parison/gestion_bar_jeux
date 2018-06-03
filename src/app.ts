import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import {tablesRouter} from "./routes";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/tables', tablesRouter);

module.exports = app;
