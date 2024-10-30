const express = require("express");

const app = express();

app.get("/", (request, response, next) => {
  response.send("Hello world !!");
});

const users = [
  {
    id: 1234567,
    fullName: "John Doe",
  },
];

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

app.get("/users", (req, resp, next) => {
  resp.json(users);
});

app.post("/users", (req, res, next) => {
  const userToCreate = {
    ...req.body,
    id: Date.now(),
  };

  users.push(userToCreate);
  console.log(req);

  res.status(201).json(userToCreate);
});

app.patch("/users/:id", (req, res, next) => {
  const user = users.find((us) => us.id === parseInt(req.params.id));
  if (!user) {
    return res.sendStatus(404);
  }

  Object.assign(user, req.body);

  res.json(user);
});

app.listen(3000, () => console.log("Server listening on port 3000"));
