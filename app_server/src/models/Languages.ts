import * as Sequelize from "sequelize";

interface LanguagesAttributes {
    id?: number;
    name: string;
}

type LanguagesInstance = Sequelize.Instance<LanguagesAttributes> & LanguagesAttributes;

const attributes: SequelizeAttributes<LanguagesAttributes> = {
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
    const model = sequelize.define<LanguagesInstance, LanguagesAttributes>("languages", attributes);

    model.associate = function(db) {
        model.belongsToMany(db.Games, {
            through: {
                model: db.GamesLanguages,
                unique: true,
            },
            foreignKey: 'id_language',
        })
    };
    return model;
};
