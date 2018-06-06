import * as Sequelize from "sequelize";

interface MecanismsAttributes {
    id?: number;
    name: string;
}

type MecanismsInstance = Sequelize.Instance<MecanismsAttributes> & MecanismsAttributes;

const attributes: SequelizeAttributes<MecanismsAttributes> = {
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
    const model = sequelize.define<MecanismsInstance, MecanismsAttributes>("mecanisms", attributes);

    model.associate = function(db) {
        model.belongsToMany(db.Games, {
            through: {
                model: db.GamesMecanisms,
                unique: true,
            },
            foreignKey: 'id_mecanism',
        })
    };
    return model;
};
