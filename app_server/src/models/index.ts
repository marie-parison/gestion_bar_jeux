require('dotenv').config();

import * as Sequelize from "sequelize";
import AuthorsFactory from "./Authors";
import BrandsFactory from "./Brands";
import CategoriesFactory from "./Categories";
import ContentsFactory from "./Contents";
import EditorsFactory from "./Editors";
import GamesFactory from "./Games";
import GamesAuthorsFactory from "./GamesAuthors";
import GamesCategoriesFactory from "./GamesCategories";
import GamesEditorsFactory from "./GamesEditors";
import GamesLanguagesFactory from "./GamesLanguages";
import GamesMecanismsFactory from "./GamesMecanisms";
import GamePicturesFactory from "./GamePictures";
import LanguagesFactory from "./Languages";
import MecanismsFactory from "./Mecanisms";

// load firstly the root .env file configuration
const dbHostname = process.env.DB_HOSTNAME || 'localhost';
const dbUsername = process.env.DB_USERNAME || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbDatabase = process.env.DB_DATABASE || 'gestion_bar';
const dbPort = parseInt(process.env.DB_PORT) || 3306;

const sequelize = new Sequelize(dbDatabase, dbUsername, dbPassword, {
    host: dbHostname,
    port: dbPort,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 40000,
    }
});

// object which contains all the table factory
const db: any = {
    sequelize,
    Sequelize,
    Authors: AuthorsFactory(sequelize),
    Brands: BrandsFactory(sequelize),
    Categories: CategoriesFactory(sequelize),
    Contents: ContentsFactory(sequelize),
    Editors: EditorsFactory(sequelize),
    Games: GamesFactory(sequelize),
    GamesAuthors: GamesAuthorsFactory(sequelize),
    GamesCategories: GamesCategoriesFactory(sequelize),
    GamesEditors: GamesEditorsFactory(sequelize),
    GamesLanguages: GamesLanguagesFactory(sequelize),
    GamesMecanisms: GamesMecanismsFactory(sequelize),
    GamePictures: GamePicturesFactory(sequelize),
    Languages: LanguagesFactory(sequelize),
    Mecanisms: MecanismsFactory(sequelize),
};

// we launch each associate method from model to define the relationship between tables
for(let model in db) {
    if (db[model].associate) {
        db[model].associate(db);
    }
}

export default db;
