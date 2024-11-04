const { Sequelize } = require("sequelize");

const defaultDatabaseUrl = "mysql://username:password@localhost:3306/dbname";

const connection = new Sequelize(
  process.env.DATABASE_URL ?? defaultDatabaseUrl
);

connection.authenticate().then(() => console.log("Database is ready"));

module.exports = connection;
