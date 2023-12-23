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
  const minion = getFromDatabaseById("minions", minionId);

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

minionsRouter.get("/:minionId/work", (req, res, next) => {
  const work = getAllFromDatabase("work").filter(
    (singleWork) => singleWork.minionId === req.minion.id
  );
  if (work) {
    res.send(work);
  } else {
    res.status(404).send();
  }
});

minionsRouter.post("/:minionId/work", (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.minion.id;
  const createdWork = addToDatabase("work", newWork);
  res.status(201).send(createdWork);
});

minionsRouter.param("workId", (req, res, next, id) => {
  const workId = id;
  const work = getFromDatabaseById("work", workId);

  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.minion && req.work && req.minion.id === req.work.minionId) {
    
    const updatedWork = updateInstanceInDatabase("work", req.body);
    res.send(updatedWork);
  } else {
    res.status(400).send();
  }
});

minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  if (req.minion && req.work) {
    deleteFromDatabasebyId("work", req.work.id);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});


module.exports = minionsRouter;
