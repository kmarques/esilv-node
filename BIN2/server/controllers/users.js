const User = require("../models/user");

exports.cget = async (req, resp, next) => {
  resp.json(await User.findAll());
};

exports.post = async (req, res, next) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (error) {
    next(error);
  }
};

exports.patch = async (req, res, next) => {
  try {
    const [nbUpdate] = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
    });
    if (nbUpdate === 0) {
      return res.sendStatus(404);
    } else {
      res.json(await User.findByPk(parseInt(req.params.id)));
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id)) return res.sendStatus(403);

  const nbDeleted = await User.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.sendStatus(nbDeleted ? 204 : 404);
};

exports.get = async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.params.id));

  res.status(user ? 200 : 404).json(user);
};
