import * as Sequelize from "sequelize";

interface GamesLanguagesAttributes {
    id_game: number;
    id_language: number;
}

type GamesLanguagesInstance = Sequelize.Instance<GamesLanguagesAttributes> & GamesLanguagesAttributes;

const attributes: SequelizeAttributes<GamesLanguagesAttributes> = {
    id_game: {
        type: Sequelize.BIGINT,
        references: {
            model: 'games',
            key: 'id',
        },
    },
    id_language: {
        type: Sequelize.BIGINT,
        references: {
            model: 'languages',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<GamesLanguagesInstance, GamesLanguagesAttributes>("games_languages", attributes);

    model.associate = function(db) {

    };
    return model;
};
