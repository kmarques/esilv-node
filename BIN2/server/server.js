const express = require("express");

const app = express();

app.get("/", (request, response, next) => {
  response.send("Hello world !!");
});

//function parseBody(req, res, next) {
//  let data = "";
//  req.on("data", (chunk) => (data += chunk.toString()));
//
//  req.on("end", () => {
//    data = JSON.parse(data);
//    req.body = data;
//
//    next();
//  });
//}

//app.use(parseBody);
app.use(express.json() /* body-parser lib */);

app.use(require("./routes/users"));
app.use(require("./routes/animals"));

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(3000, () => console.log("Server listening on port 3000"));
