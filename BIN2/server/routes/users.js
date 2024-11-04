const { Router } = require("express");
const UserController = require("../controllers/users");

const router = new Router();

router.get("/users", UserController.cget);
router.post("/users", UserController.post);

router.get("/users/:id", UserController.get);
router.patch("/users/:id", UserController.patch);
router.delete("/users/:id", UserController.delete);

module.exports = router;
