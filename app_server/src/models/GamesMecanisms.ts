import * as Sequelize from "sequelize";

interface GamesMecanismsAttributes {
    id_game: number;
    id_mecanism: number;
}

type GamesMecanismsInstance = Sequelize.Instance<GamesMecanismsAttributes> & GamesMecanismsAttributes;

const attributes: SequelizeAttributes<GamesMecanismsAttributes> = {
    id_game: {
        type: Sequelize.BIGINT,
        references: {
            model: 'games',
            key: 'id',
        },
    },
    id_mecanism: {
        type: Sequelize.BIGINT,
        references: {
            model: 'mecanisms',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<GamesMecanismsInstance, GamesMecanismsAttributes>("games_mecanisms", attributes);

    model.associate = function(db) {

    };
    return model;
};
