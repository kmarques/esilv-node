const { Router } = require("express");

function generateRoutes(Model) {
  const baseRoute = "/" + Model.options.name.plural.toLowerCase();
  const router = new Router();

  router.get(baseRoute + "", (req, res) => {
    const criteria = req.query;
    Model.findAll({
      where: criteria,
    }).then((users) => {
      res.json(users);
    });
  });

  router.post(baseRoute + "", (req, res) => {
    Model.create(req.body).then((user) => {
      res.status(201).json(user);
    });
  });

  router.get(baseRoute + "/:id", (req, res) => {
    const id = req.params.id;
    Model.findByPk(id).then((user) => {
      if (!user) res.sendStatus(404);
      else res.json(user);
    });
  });

  router.put(baseRoute + "/:id", (req, res) => {
    const id = req.params.id;
    Model.update(req.body, {
      where: { id: id },
    }).then(([nbUpdated]) => {
      if (!nbUpdated) res.sendStatus(404);
      else Model.findByPk(id).then((user) => res.json(user));
    });
  });

  router.delete(baseRoute + "/:id", (req, res) => {
    const id = req.params.id;
    Model.destroy({
      where: { id: id },
    }).then((nbDeleted) => {
      if (!nbDeleted) res.sendStatus(404);
      else res.sendStatus(204);
    });
  });

  return router;
}

module.exports = generateRoutes;
