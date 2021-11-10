const Sequelize = require("sequelize");

const connection = new Sequelize(
  "mariadb://username:password@localhost:3306/database"
);

connection.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

module.exports = connection;
