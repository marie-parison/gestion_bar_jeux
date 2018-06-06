import * as Sequelize from "sequelize";

interface TablesAttributes {
    id?: number;
    number: number;
    nb_slot?: number;
    available?: boolean;
}

type TablesInstance = Sequelize.Instance<TablesAttributes> & TablesAttributes;

const attributes: SequelizeAttributes<TablesAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nb_slot: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<TablesInstance, TablesAttributes>("tables", attributes);
    model.associate = function(db) {
        model.hasOne(db.Invoices, {
            foreignKey: 'id_table'
        });

    };
    return model;
};
