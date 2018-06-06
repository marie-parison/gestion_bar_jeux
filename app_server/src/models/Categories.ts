import * as Sequelize from "sequelize";

interface CategoriesAttributes {
    id?: number;
    name: string;
}

type CategoriesInstance = Sequelize.Instance<CategoriesAttributes> & CategoriesAttributes;

const attributes: SequelizeAttributes<CategoriesAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<CategoriesInstance, CategoriesAttributes>("categories", attributes);

    model.associate = function(db) {
        model.belongsToMany(db.Games, {
            through: {
                model: db.GamesCategories,
                unique: true,
            },
            foreignKey: 'id_category',
        })

    };
    return model;
};
