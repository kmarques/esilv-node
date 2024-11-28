const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Animal extends Model {}

Animal.init(
  {
    name: DataTypes.STRING,
    race: {
      type: DataTypes.ENUM("chien", "chat", "souris"),
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = Animal;
