const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const attributes = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            // autoIncrement: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        region: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },

    };
    const options = {
        timestamps: true
    };
    return sequelize.define('product', attributes, options);
}