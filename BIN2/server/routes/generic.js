// Créer un CRUD complet en API RESTFULL pour une entité Post
// Post est défini par
// title: NOT NULL String
// content: NOT NULL String
// tags: STRING NULLABLE (sous la forme "tech-market-comm")

const express = require("express");

function generateRoutes(Model) {
  const router = express.Router();
  router.get("", (req, res) => {
    const criteria = req.query;
    Model.findAll({
      where: criteria,
    }).then((users) => res.json(users));
  });

  router.post("", (req, res) => {
    Model.create(req.body).then((user) => res.status(201).json(user));
  });

  router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Model.findByPk(id).then((user) => {
      if (!user) res.sendStatus(404);
      else res.json(user);
    });
  });

  router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Model.destroy({
      where: {
        id: id,
      },
    }).then((nbDeleted) => {
      if (!nbDeleted) res.sendStatus(404);
      else res.sendStatus(204);
    });
  });

  router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Model.update(req.body, {
      where: {
        id: id,
      },
    }).then(([nbUpdated]) => {
      if (!nbUpdated) res.sendStatus(404);
      else Model.findByPk(id).then((user) => res.json(user));
    });
  });
  return router;
}
module.exports = generateRoutes;
