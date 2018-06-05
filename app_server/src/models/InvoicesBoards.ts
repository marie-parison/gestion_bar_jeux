import * as Sequelize from "sequelize";

interface InvoicesBoardsAttributes {
    id_invoice: number;
    id_board: number;
}

type InvoicesBoardsInstance = Sequelize.Instance<InvoicesBoardsAttributes> & InvoicesBoardsAttributes;

const attributes: SequelizeAttributes<InvoicesBoardsAttributes> = {
    id_invoice: {
        type: Sequelize.BIGINT,
        references: {
            model: 'invoices',
            key: 'id',
        },
    },
    id_board: {
        type: Sequelize.BIGINT,
        references: {
            model: 'boards',
            key: 'id',
        }
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<InvoicesBoardsInstance, InvoicesBoardsAttributes>("invoices_boards", attributes);

    model.associate = function(db) {
    };
    return model;
};
