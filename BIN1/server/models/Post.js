const { Model, DataTypes } = require("sequelize");
const connection = require("../lib/db");

class Post extends Model {}

Post.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    tags: {
      type: DataTypes.STRING,
      validate: {
        is: /^([a-z]+)(,[a-z]+)*$/i,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Post",
  }
);

connection.sync().then(() => {
  console.log("Database synced");
});

module.exports = Post;
