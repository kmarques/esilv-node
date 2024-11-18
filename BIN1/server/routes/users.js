const { Router } = require("express");
const userController = require("../controllers/users.js");
const checkAuth = require("../middlewares/checkAuth.js");

const router = new Router();

router.get("/users", checkAuth, userController.getAll);

router.post("/users", userController.create);

router.get("/users/:id", checkAuth, userController.getOne);

router.patch("/users/:id", checkAuth, userController.update);

router.delete("/users/:id", checkAuth, userController.delete);

module.exports = router;
