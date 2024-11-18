const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const headerValue = req.headers.authorization ?? req.headers.Authorization;
  if (!headerValue) return res.sendStatus(401);
  // Bearer jdkelzfhjezlkhfnjzle
  const [type, token] = headerValue.split(/\s+/);
  if (type !== "Bearer") return res.sendStatus(401);
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "MyVeryVeryStrongSecret&IL1k31T"
    );
    req.user = await User.findByPk(payload.id);
    if (!req.user) return res.sendStatus(401);
    if (!req.user.activated) return res.sendStatus(403);
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};
