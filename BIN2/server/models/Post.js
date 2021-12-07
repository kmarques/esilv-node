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
        is: /^[a-z]+(-[a-z]+)*$/,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Post",
  }
);

module.exports = Post;
