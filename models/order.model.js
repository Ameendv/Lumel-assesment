const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const attributes = {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            // autoIncrement: true
        },
        product_id: { type: DataTypes.STRING, allowNull: false },
        customer_id: { type: DataTypes.STRING, allowNull: false },
        date_of_sale: { type: DataTypes.DATE, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        discount: { type: DataTypes.FLOAT, allowNull: false },
        shipping_cost: { type: DataTypes.FLOAT, allowNull: false },
        payment_method: { type: DataTypes.STRING, allowNull: false },

    };
    const options = {
        timestamps: true
    };
    return sequelize.define('order', attributes, options);
}