const { Router } = require("express");
const { createToken } = require("../lib/jwt");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = Router();

router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          token: createToken(user),
        });
      } else {
        res.status(400).json({
          password: "Invalid credentials",
        });
      }
    } else {
      res.status(400).json({
        email: "Email not found",
      });
    }
  });
});

module.exports = router;
