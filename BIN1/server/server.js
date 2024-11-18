const express = require("express");
const userRouter = require("./routes/users");

const app = express();

app.use(express.json());

app.get("/", (request, response, next) => {
  response.send("Hello world !!");
});

app.use(userRouter);
app.use(require("./routes/security"));

app.listen(process.env.PORT, () =>
  console.log("Server listening on port " + process.env.PORT)
);
