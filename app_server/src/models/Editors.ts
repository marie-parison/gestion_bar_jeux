import * as Sequelize from "sequelize";

interface EditorsAttributes {
    id?: number;
    name: string;
}

type EditorsInstance = Sequelize.Instance<EditorsAttributes> & EditorsAttributes;

const attributes: SequelizeAttributes<EditorsAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<EditorsInstance, EditorsAttributes>("editors", attributes);

    model.associate = function(db) {
        model.belongsToMany(db.Games, {
            through: {
                model: db.GamesEditors,
                unique: true,
            },
            foreignKey: 'id_editor',
        })
    };
    return model;
};
