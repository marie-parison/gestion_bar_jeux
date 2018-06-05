import * as Sequelize from "sequelize";

interface GamesAttributes {
    id?: number;
    id_brand: number;
    name: string;
    price: number;
    description_fr?: string;
    description_en?: string;
    player_min?: number;
    player_max?: number;
    age_min?: number;
    age_max?: number;
    duration_min?: number;
    duration_max?: number;
}

type GamesInstance = Sequelize.Instance<GamesAttributes> & GamesAttributes;

const attributes: SequelizeAttributes<GamesAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    id_brand: {
        type: Sequelize.BIGINT,
        references: {
            model: 'brands',
            key: 'id',
        }
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description_fr: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    description_en: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    player_min: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    player_max: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    age_min: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    age_max: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    duration_min: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    duration_max: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<GamesInstance, GamesAttributes>("games", attributes);

    model.associate = function(db) {
        model.hasMany(db.Contents, {
            foreignKey: 'id_game',
        });

        model.hasMany(db.Boards, {
            foreignKey: 'id_game',
        });

        model.hasMany(db.GamePictures, {
            foreignKey: 'id_game',
        });

        model.belongsToMany(db.Languages, {
            through: {
                model: db.GamesLanguages,
                unique: true,
            },
            foreignKey: 'id_game',
        });

        model.belongsToMany(db.Categories, {
            through: {
                model: db.GamesCategories,
                unique: true,
            },
            foreignKey: 'id_game',
        });

        model.belongsToMany(db.Authors, {
            through: {
                model: db.GamesAuthors,
                unique: true,
            },
            foreignKey: 'id_game',
        });

        model.belongsToMany(db.Editors, {
            through: {
                model: db.GamesEditors,
                unique: true,
            },
            foreignKey: 'id_game',
        });

        model.belongsToMany(db.Mecanisms, {
            through: {
                model: db.GamesMecanisms,
                unique: true,
            },
            foreignKey: 'id_game',
        });
    };
    return model;
};
