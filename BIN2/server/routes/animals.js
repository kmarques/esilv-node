const { Router } = require("express");
const AnimalController = require("../controllers/animals");

const router = new Router();

router.get("/animals", AnimalController.cget);
router.post("/animals", AnimalController.post);

router.get("/animals/:id", AnimalController.get);
router.patch("/animals/:id", AnimalController.patch);
router.delete("/animals/:id", AnimalController.delete);

module.exports = router;
