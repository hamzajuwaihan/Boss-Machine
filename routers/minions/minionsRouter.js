const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  deleteFromDatabasebyId,
  updateInstanceInDatabase,
} = require("../../server/db");
const minionsRouter = express.Router();

minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

minionsRouter.post("/", (req, res, next) => {
  try {
    const newMinion = addToDatabase("minions", req.body);
    res.status(201).send(newMinion);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

minionsRouter.param("minionId", (req, res, next, id) => {
  const minionId = id;
  console.log(minionId);
  const minion = getFromDatabaseById("minions", minionId);
  console.log(req.minion);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/:minionId", (req, res, next) => {

  if (req.minion) {
    res.send(req.minion);
  } else {
    res.status(404).send("minion not found");
  }
});

minionsRouter.put("/:minionId", (req, res, next) => {
  if (req.minion) {
    const updatedMinion = updateInstanceInDatabase("minions", req.body);
    res.send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  if (req.minion) {
    deleteFromDatabasebyId("minions", req.minion.id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter;
