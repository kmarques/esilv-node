const Sequelize = require("sequelize");

const connection = new Sequelize(
  "mariadb://username:password@localhost:3306/database"
);

connection.authenticate().then(() => console.log("Database connected"));

module.exports = connection;
