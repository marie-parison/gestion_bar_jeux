import * as Sequelize from "sequelize";

interface InvoicesAttributes {
    id?: number;
    id_table: number;
    id_board: number;
    start_at: string;
    finish_at?: string;
    is_paid: boolean;
    sum_paid?: number;
}

type InvoicesInstance = Sequelize.Instance<InvoicesAttributes> & InvoicesAttributes;

const attributes: SequelizeAttributes<InvoicesAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    id_table: {
        type: Sequelize.BIGINT,
        references: {
            model: 'tables',
            key: 'id',
        }
    },
    id_board: {
        type: Sequelize.BIGINT,
        references: {
            model: 'boards',
            key: 'id',
        }
    },
    start_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    finish_at: {
        type: Sequelize.DATE,
    },
    is_paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    sum_paid: {
        type: Sequelize.INTEGER,
        defaultValue: null,
    },

};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<InvoicesInstance, InvoicesAttributes>("boards", attributes);

    model.associate = function(db) {

        model.belongsToMany(db.Foods, {
            through: {
                model: db.InvoicesFoods,
            },
            foreignKey: 'id_food'
        });

        model.belongsToMany(db.Boards, {
            through: {
                model: db.InvoicesBoards,
            },
            foreignKey: 'id_board'
        });

        model.belongsToMany(db.Customers, {
            through: {
                model: db.InvoicesCustomers,
            },
            foreignKey: 'id_customer'
        });
    };
    return model;
};
