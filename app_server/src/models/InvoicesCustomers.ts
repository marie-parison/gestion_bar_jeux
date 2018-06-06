import * as Sequelize from "sequelize";

interface InvoicesCustomersAttributes {
    id_invoice: number;
    id_customer: number;
}

type InvoicesCustomersInstance = Sequelize.Instance<InvoicesCustomersAttributes> & InvoicesCustomersAttributes;

const attributes: SequelizeAttributes<InvoicesCustomersAttributes> = {
    id_invoice: {
        type: Sequelize.BIGINT,
        references: {
            model: 'invoices',
            key: 'id',
        },
    },
    id_customer: {
        type: Sequelize.BIGINT,
        references: {
            model: 'customers',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<InvoicesCustomersInstance, InvoicesCustomersAttributes>("invoices_customers", attributes);

    model.associate = function(db) {

    };
    return model;
};
