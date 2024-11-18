const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const header = req.headers.authorization ?? req.headers.Authorization;
  if (!header) {
    return res.sendStatus(401);
  }
  const [type, token] = header.split(/\s+/);
  if (type !== "Bearer") {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "MyVeryVeryVeryFormidableSecret&1L1kE17"
    );

    req.user = await User.findByPk(payload.id);
    if (!req.user) return res.sendStatus(401);
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};
