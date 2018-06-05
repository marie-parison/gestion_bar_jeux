import * as Sequelize from "sequelize";

interface AuthorsAttributes {
    id?: number;
    name: string;
}

type AuthorsInstance = Sequelize.Instance<AuthorsAttributes> & AuthorsAttributes;

const attributes: SequelizeAttributes<AuthorsAttributes> = {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
};

export default (sequelize: Sequelize.Sequelize) => {
    const model = sequelize.define<AuthorsInstance, AuthorsAttributes>("authors", attributes);

    model.associate = function(db) {
        model.belongsToMany(db.Games, {
            through: {
                model: db.GamesAuthors,
                unique: true,
            },
            foreignKey: 'id_author',
        })
    };
    return model;
};
