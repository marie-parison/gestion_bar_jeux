import * as Sequelize from "sequelize";

interface BrandsAttributes {
    id?: number;
    name: string;
}

type BrandsInstance = Sequelize.Instance<BrandsAttributes> & BrandsAttributes;

const attributes: SequelizeAttributes<BrandsAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<BrandsInstance, BrandsAttributes>("brands", attributes);

    model.associate = function(db) {

    };
    return model;
};
