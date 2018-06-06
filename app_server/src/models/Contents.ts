import * as Sequelize from "sequelize";

interface ContentsAttributes {
    id?: number;
    id_game: number;
    content: string;
}

type ContentsInstance = Sequelize.Instance<ContentsAttributes> & ContentsAttributes;

const attributes: SequelizeAttributes<ContentsAttributes> = {
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
        }
    },
    content: {
        type: Sequelize.STRING
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<ContentsInstance, ContentsAttributes>("contents", attributes);

    model.associate = function(db) {

    };
    return model;
};

