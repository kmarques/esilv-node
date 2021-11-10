const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const UserRouter = require("./routes/user");

app.use(express.json());
app.use(UserRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
