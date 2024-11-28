const { Router } = require("express");
const animalController = require("../controllers/animals.js");
const checkAuth = require("../middlewares/checkAuth.js");

const router = new Router();

router.get("/animals", animalController.getAll);

router.post("/animals", animalController.create);

router.get("/animals/:id", animalController.getOne);

router.patch("/animals/:id", animalController.update);

router.delete("/animals/:id", animalController.delete);

module.exports = router;
