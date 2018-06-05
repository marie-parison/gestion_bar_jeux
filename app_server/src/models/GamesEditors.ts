import * as Sequelize from "sequelize";

interface GamesEditorsAttributes {
    id_game: number;
    id_editor: number;
}

type GamesEditorsInstance = Sequelize.Instance<GamesEditorsAttributes> & GamesEditorsAttributes;

const attributes: SequelizeAttributes<GamesEditorsAttributes> = {
    id_game: {
        type: Sequelize.BIGINT,
        references: {
            model: 'games',
            key: 'id',
        },
    },
    id_editor: {
        type: Sequelize.BIGINT,
        references: {
            model: 'editors',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<GamesEditorsInstance, GamesEditorsAttributes>("games_editors", attributes);

    model.associate = function(db) {

    };
    return model;
};
