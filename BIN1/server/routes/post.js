// Créer un CRUD complet en RESTFULL
// pour une entité "Post"

// Post est défini par
// title: String NOT NULL
// content: String NOT NULL
// tags: String NULLABLE (sous la forme "tech,market")
const { Router } = require("express");
const Post = require("../models/Post");

const router = new Router();

router.get("/posts", (req, res) => {
  const criteria = req.query;
  Post.findAll({
    where: criteria,
  }).then((users) => {
    res.json(users);
  });
});

router.post("/posts", (req, res) => {
  Post.create(req.body).then((user) => {
    res.status(201).json(user);
  });
});

router.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.findByPk(id).then((user) => {
    if (!user) res.sendStatus(404);
    else res.json(user);
  });
});

router.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.update(req.body, {
    where: { id: id },
  }).then(([nbUpdated]) => {
    if (!nbUpdated) res.sendStatus(404);
    else Post.findByPk(id).then((user) => res.json(user));
  });
});

router.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: { id: id },
  }).then((nbDeleted) => {
    if (!nbDeleted) res.sendStatus(404);
    else res.sendStatus(204);
  });
});

module.exports = router;
