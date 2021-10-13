const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  res.json([
    {
      name: "Mike",
      age: 27,
    },
    {
      name: "John",
      age: 30,
    },
  ]);
});

app.post("/users", (req, res) => {
  res.status(201).json(req.body);
});

app.put("/users/:id", (req, res) => {
  res.json(req.body);
});

app.get("/users/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Mike",
    age: 27,
  });
});

app.delete("/users/:id", (req, res) => {
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
