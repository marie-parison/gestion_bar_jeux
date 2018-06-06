import * as Sequelize from "sequelize";

interface GamesCategoriesAttributes {
    id_game: number;
    id_category: number;
}

type GamesCategoriesInstance = Sequelize.Instance<GamesCategoriesAttributes> & GamesCategoriesAttributes;

const attributes: SequelizeAttributes<GamesCategoriesAttributes> = {
    id_game: {
        type: Sequelize.BIGINT,
        references: {
            model: 'games',
            key: 'id',
        },
    },
    id_category: {
        type: Sequelize.BIGINT,
        references: {
            model: 'categories',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<GamesCategoriesInstance, GamesCategoriesAttributes>("games_categories", attributes);

    model.associate = function(db) {

    };
    return model;
};
