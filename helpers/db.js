require('dotenv').config();

const config = require("config.js");
const mysql = require("mysql2/promise");
// const {createPool} = require('mysql');
const dotenv = require("dotenv");

dotenv.config();

const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  console.log(config.database)
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });


  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
  
  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
    define: { freezeTableName: true },
    host,
    port,
    password,
    retry: {
      match: [/Deadlock/i],
      max: 3, // Maximum rety 3 times
      backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
  });

  db.Customer = require('../models/customer.model')(sequelize)
  db.Products = require('../models/product.model')(sequelize)
  db.Order = require('../models/order.model')(sequelize)


  db.Customer.hasMany(db.Order, { foreignKey: 'id', as: 'orders' });
  db.Order.belongsTo(db.Customer, { foreignKey: 'id', as: 'customer' });

  db.Products.hasMany(db.Order, { foreignKey: 'id', as: 'orders' });
  db.Order.belongsTo(db.Products, { foreignKey: 'id', as: 'product' });

   


    db.sequelize = sequelize

    
    // sync all models with database
    await sequelize.sync();
}

