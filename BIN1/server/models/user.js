const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //len: [8, 32],
        //is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[a-zA-Z\d]{8,32}$/,
      },
    },
    role: {
      type: DataTypes.ENUM(["ROLE_USER", "ROLE_ADMIN"]),
      defaultValue: "ROLE_USER",
      allowNull: false,
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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

User.addHook("beforeCreate", async (user) => {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
  if (fields.includes("password"))
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
});

module.exports = User;
