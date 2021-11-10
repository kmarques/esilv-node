const { Model, DataTypes } = require("sequelize");
const connection = require("../lib/db");

class User extends Model {}

User.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

connection.sync().then(() => {
  console.log("Database synced");
});

module.exports = User;
