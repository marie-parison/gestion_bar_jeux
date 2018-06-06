import * as Sequelize from "sequelize";

interface GamesPicturesAttributes {
    id?: number;
    id_game: number;
    small?: string;
    thickbox?: string;
    large?: string;
}

type GamesPicturesInstance = Sequelize.Instance<GamesPicturesAttributes> & GamesPicturesAttributes;

const attributes: SequelizeAttributes<GamesPicturesAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    id_game: {
        type: Sequelize.BIGINT,
        references: {
            model: 'games',
            key: 'id',
        },
    },
    small: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    thickbox: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    large: {
        type: Sequelize.STRING,
        allowNull: true,
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<GamesPicturesInstance, GamesPicturesAttributes>("game_pictures", attributes);

    model.associate = function(db) {

    };
    return model;
};
