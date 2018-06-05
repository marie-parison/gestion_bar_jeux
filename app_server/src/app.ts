import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import {tablesRouter} from "./routes";
import db from "./models/";

// let db = require('./models/Db');

// import {Db} from './models/';
// import * as Sequelize from 'sequelize';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

db.sequelize.sync()
    .then(() => {
        console.log('Connection successfull');
        main();
    })
    .catch((err: any) => {
       console.error('Unable to connect to the database', err)
    });

function main() {
    db.Games.findById(2, {
        include: [
            db.Languages,
            db.Contents,
            db.GamePictures,
        ]
    })
        .then((game: any) => {
            console.log(game.languages[0].id);
            console.log(game.game_pictures[0].dataValues);
        })
}

app.use('/tables', tablesRouter);

module.exports = app;
