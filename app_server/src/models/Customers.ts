import * as Sequelize from "sequelize";

interface CustomersAttributes {
    id?: number;
    fistname?: string;
    lastname?: string;
    email: string;
}

type CustomersInstance = Sequelize.Instance<CustomersAttributes> & CustomersAttributes;

const attributes: SequelizeAttributes<CustomersAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    fistname: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    }
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<CustomersInstance, CustomersAttributes>("customers", attributes);
    model.associate = function(db) {
        model.belongsToMany(db.Invoices, {
            through: {
                model: db.InvoicesCustomers,
            },
            foreignKey: 'id_invoice'
        });
    };
    return model;
};
