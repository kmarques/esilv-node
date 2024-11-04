const Animal = require("../models/animal");

exports.cget = async (req, resp, next) => {
  resp.json(await Animal.findAll());
};

exports.post = async (req, res, next) => {
  try {
    res.status(201).json(await Animal.create(req.body));
  } catch (error) {
    next(error);
  }
};

exports.patch = async (req, res, next) => {
  try {
    const [nbUpdate] = await Animal.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (nbUpdate === 0) {
      return res.sendStatus(404);
    } else {
      res.json(await Animal.findByPk(parseInt(req.params.id)));
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const nbDeleted = await Animal.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.sendStatus(nbDeleted ? 204 : 404);
};

exports.get = async (req, res, next) => {
  const animal = await Animal.findByPk(parseInt(req.params.id));

  res.status(animal ? 200 : 404).json(animal);
};
