const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
  res.json([
    {
      id: 1,
      name: "John",
      age: 30,
    },
    {
      id: 2,
      name: "Jane",
      age: 20,
    },
  ]);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 1) {
    res.json({
      id: 1,
      name: "John",
      age: 30,
    });
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id === 1) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.post("", (req, res) => {
  console.log(req);
  const user = req.body;
  if (user.name && user.age) {
    res.status(201).json({
      name: user.name,
      age: user.age,
      id: new Date().getTime(),
    });
  } else {
    const error = {};
    if (!user.name) {
      error.name = "required";
    }
    if (!user.age) {
      error.age = "required";
    }
    res.status(400).json(error);
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = req.body;
  if (id === 1) {
    if (user.name && user.age) {
      res.json({
        id: 1,
        name: user.name,
        age: user.age,
      });
    } else {
      const error = {};
      if (!user.name) {
        error.name = "required";
      }
      if (!user.age) {
        error.age = "required";
      }
      res.status(400).json(error);
    }
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
