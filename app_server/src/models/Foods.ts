import * as Sequelize from "sequelize";

interface FoodsAttributes {
    id?: number;
    name: string;
    price: number;
    picture?: string;
}

type FoodsInstance = Sequelize.Instance<FoodsAttributes> & FoodsAttributes;

const attributes: SequelizeAttributes<FoodsAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true,
    }
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<FoodsInstance, FoodsAttributes>("foods", attributes);
    model.associate = function(db) {
        model.belongsToMany(db.Invoices, {
            through: {
                model: db.InvoicesFoods,
            },
            foreignKey: 'id_food'
        });
    };
    return model;
};
