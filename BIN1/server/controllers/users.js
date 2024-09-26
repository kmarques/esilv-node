const users = [];

module.exports = {
  getAll: (req, res, next) => {
    res.json(users);
  },
  create: (req, res, next) => {
    const user = req.body;
    user.id = Date.now();
    users.push(user);
    res.status(201).json(user);
  },
  getOne: (req, res, next) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  },
  update: (req, res, next) => {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (!user) return res.sendStatus(404);
    Object.assign(user, req.body);
    res.json(user);
  },
  delete: (req, res, next) => {
    const userIndex = users.findIndex(
      (user) => user.id === parseInt(req.params.id)
    );
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
};
