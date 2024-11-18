const { Router } = require("express");
const UserController = require("../controllers/users");
const checkAuth = require("../middlewares/checkAuth");

const router = new Router();

router.get("/users", checkAuth, UserController.cget);
router.post("/users", UserController.post);

router.get("/users/:id", UserController.get);
router.patch("/users/:id", UserController.patch);
router.delete("/users/:id", checkAuth, UserController.delete);

module.exports = router;
