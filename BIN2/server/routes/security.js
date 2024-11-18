const { Router } = require("express");

const SecurityController = require("../controllers/security");

const router = new Router();

router.post("/login", SecurityController.login);

module.exports = router;
