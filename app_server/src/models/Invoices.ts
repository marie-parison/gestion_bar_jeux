import * as Sequelize from "sequelize";

interface InvoicesAttributes {
    id?: number;
    id_table: number;
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
    const model = sequelize.define<InvoicesInstance, InvoicesAttributes>("invoices", attributes);

    model.associate = function(db) {
        model.belongsToMany(db.Foods, {
            through: {
                model: db.InvoicesFoods,
            },
            foreignKey: 'id_invoice'
        });

        model.belongsToMany(db.Boards, {
            through: {
                model: db.InvoicesBoards,
            },
            foreignKey: 'id_invoice'
        });

        model.belongsToMany(db.Customers, {
            through: {
                model: db.InvoicesCustomers,
            },
            foreignKey: 'id_invoice'
        });

        model.belongsTo(db.Tables, {
            foreignKey: 'id_table'
        })
    };
    return model;
};
