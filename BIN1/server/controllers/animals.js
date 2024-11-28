const Animal = require("../models/animal");

module.exports = {
  getAll: async (req, res, next) => {
    const animals = await Animal.findAll({
      where: req.query,
    });
    res.json(animals);
  },
  create: async (req, res, next) => {
    res.status(201).json(await Animal.create(req.body));
  },
  getOne: async (req, res, next) => {
    const animal = await Animal.findByPk(parseInt(req.params.id));
    if (animal) {
      res.json(animal);
    } else {
      res.sendStatus(404);
    }
  },
  update: async (req, res, next) => {
    const nbUpdated = await Animal.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
      //returning: true
    });
    if (!nbUpdated) return res.sendStatus(404);

    res.json(await Animal.findByPk(parseInt(req.params.id)));
  },
  delete: async (req, res, next) => {
    const nbDeleted = await Animal.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.sendStatus(nbDeleted ? 204 : 404);
  },
};
