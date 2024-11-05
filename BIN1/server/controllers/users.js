const User = require("../models/user");

module.exports = {
  getAll: async (req, res, next) => {
    res.json(await User.findAll());
  },
  create: async (req, res, next) => {
    res.status(201).json(await User.create(req.body));
  },
  getOne: async (req, res, next) => {
    const user = await User.findByPk(parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  },
  update: async (req, res, next) => {
    const nbUpdated = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      //returning: true
    });
    if (!nbUpdated) return res.sendStatus(404);

    res.json(await User.findByPk(parseInt(req.params.id)));
  },
  delete: async (req, res, next) => {
    const nbDeleted = await User.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.sendStatus(nbDeleted ? 204 : 404);
  },
};
