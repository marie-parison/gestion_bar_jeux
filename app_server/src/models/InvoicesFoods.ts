import * as Sequelize from "sequelize";

interface InvoicesFoodsAttributes {
    id_invoice: number;
    id_food: number;
}

type InvoicesFoodsInstance = Sequelize.Instance<InvoicesFoodsAttributes> & InvoicesFoodsAttributes;

const attributes: SequelizeAttributes<InvoicesFoodsAttributes> = {
    id_invoice: {
        type: Sequelize.BIGINT,
        references: {
            model: 'invoices',
            key: 'id',
        },
    },
    id_food: {
        type: Sequelize.BIGINT,
        references: {
            model: 'foods',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<InvoicesFoodsInstance, InvoicesFoodsAttributes>("invoices_foods", attributes);

    model.associate = function(db) {

    };
    return model;
};
