import * as Sequelize from "sequelize";

interface GamesAuthorsAttributes {
    id_game: number;
    id_author: number;
}

type GamesAuthorsInstance = Sequelize.Instance<GamesAuthorsAttributes> & GamesAuthorsAttributes;

const attributes: SequelizeAttributes<GamesAuthorsAttributes> = {
    id_game: {
        type: Sequelize.BIGINT,
        references: {
            model: 'games',
            key: 'id',
        },
    },
    id_author: {
        type: Sequelize.BIGINT,
        references: {
            model: 'authors',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<GamesAuthorsInstance, GamesAuthorsAttributes>("games_authors", attributes);

    model.associate = function(db) {

    };
    return model;
};
