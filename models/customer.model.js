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
        email: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },

    };
    const options = {
        timestamps: true
    };
    return sequelize.define('customer', attributes, options);
}