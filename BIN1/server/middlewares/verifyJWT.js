const { verifyToken } = require("../lib/jwt");

const verifyJWT = (req, res, next) => {
  const header = req.headers["authorization"] ?? req.headers["Authorization"];
  // header: Bearer fEZFEZFEZezf.fezfzefze.fezfze
  if (!header) {
    return res.sendStatus(401);
  }
  const splittedToken = header.split(" ");
  const token = splittedToken[1];
  const user = verifyToken(token);
  if (!user) {
    return res.sendStatus(401);
  }
  req.user = user;
  next();
};

module.exports = verifyJWT;
