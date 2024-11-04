const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class User extends Model {}

User.init(
  {
    activated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: /^.{8,32}$/,
      },
    },
    birthday: {
      type: DataTypes.STRING,
      validate: {
        isDate: true,
        //isBefore: new Date(new Date() - 1000 * 60 * 60 * 24 * 365 * 18),
      },
    },
    cguActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: connection,
  }
);

module.exports = User;
