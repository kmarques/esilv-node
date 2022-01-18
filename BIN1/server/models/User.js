const { Model, DataTypes } = require("sequelize");
const connection = require("../lib/db");
const bcrypt = require("bcryptjs");

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

const encodePassword = (user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
};
User.addHook("beforeCreate", encodePassword);
User.addHook("beforeUpdate", encodePassword);

connection.sync().then(() => {
  console.log("Database synced");
});

module.exports = User;
