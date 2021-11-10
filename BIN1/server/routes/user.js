const { Router } = require("express");
const User = require("../models/User");
const router = new Router();

router.get("/users", (req, res) => {
  const criteria = req.query;
  User.findAll({
    where: criteria,
  }).then((users) => {
    res.json(users);
  });
});

router.post("/users", (req, res) => {
  User.create(req.body).then((user) => {
    res.status(201).json(user);
  });
});

router.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((user) => {
    if (!user) res.sendStatus(404);
    else res.json(user);
  });
});

router.put("/users/:id", (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  }).then(([nbUpdated]) => {
    if (!nbUpdated) res.sendStatus(404);
    else User.findByPk(id).then((user) => res.json(user));
  });
});

router.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  }).then((nbDeleted) => {
    if (!nbDeleted) res.sendStatus(404);
    else res.sendStatus(204);
  });
});

module.exports = router;
