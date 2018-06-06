import * as Sequelize from "sequelize";

interface CustomersAttributes {
    id?: number;
    fistname?: string;
    lastname?: string;
    email: string;
    gender: string;
    birthdate: string;
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
    },
    gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female'],
        allowNull: false
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
