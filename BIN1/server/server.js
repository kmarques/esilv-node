const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const UserRouter = require("./routes/user");
const PostRouter = require("./routes/post");
//const generateRoutes = require("./routes/genericRouter");

//const Post = require("./models/Post");
//const User = require("./models/User");

app.use(express.json());
app.use(UserRouter);
app.use(PostRouter);

//app.use(generateRoutes(User));
//app.use(generateRoutes(Post));

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
