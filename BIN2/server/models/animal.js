const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Animal extends Model {}

Animal.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    race: {
      type: DataTypes.ENUM("Chat", "Chien", "Souris"),
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = Animal;
