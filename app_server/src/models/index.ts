require('dotenv').config();

import * as fs from 'fs';
import * as path from 'path';

import * as Sequelize from "sequelize";

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

// object which contains without models
const db: any = {
    sequelize,
    Sequelize,
};

// We add eac models excpte itself (index.js) to the db object
const basename = path.basename(__filename);
fs.readdirSync(__dirname)
    .filter(
        file => file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js')
    .forEach(file => {
        let modelName = file.slice(0, -3);
        let modelSequelize = require(path.join(__dirname, file)).default;
        db[modelName] = modelSequelize(sequelize);
    });

// we launch each associate method from model to define the relationship between tables
for(let model in db) {
    if (db[model].associate) {
        db[model].associate(db);
    }
}

export default db;
