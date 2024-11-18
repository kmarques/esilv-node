const { Router } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) return res.sendStatus(401);
  if (user.password !== password) {
    return res.sendStatus(401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.JWT_SECRET ?? "MyVeryVeryStrongSecret&IL1k31T"
  );

  res.json({
    token,
  });
});

module.exports = router;
