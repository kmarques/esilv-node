const { Sequelize } = require("sequelize");

const defaultURL = "mysql://username:password@localhost/dbname";

const connection = new Sequelize(process.env.DATABASE_URL ?? defaultURL);

connection.authenticate().then(() => console.log("Database is ready"));

module.exports = connection;
