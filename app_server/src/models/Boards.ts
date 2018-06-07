import * as Sequelize from "sequelize";

interface BoardsAttributes {
    id?: number;
    id_game: number;
    available?: boolean;
    condition?: string;
}

type BoardsInstance = Sequelize.Instance<BoardsAttributes> & BoardsAttributes;

const attributes: SequelizeAttributes<BoardsAttributes> = {
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
    available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    condition: {
        type: Sequelize.ENUM,
        values: ['good', 'middle', 'bad'],
        defaultValue: 'good',
    }
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<BoardsInstance, BoardsAttributes>("boards", attributes);

    model.associate = function(db) {
        model.belongsTo(db.Games, {
            foreignKey: 'id_game'
        });

        model.belongsToMany(db.Invoices, {
            through: {
                model: db.InvoicesBoards,
            },
            foreignKey: 'id_board'
        });
    };
    return model;
};
