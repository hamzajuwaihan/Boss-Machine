const express = require("express");
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  deleteFromDatabasebyId,
  updateInstanceInDatabase,
} = require("../../server/db");
const checkMillionDollarIdea = require("../../server/checkMillionDollarIdea");
const ideasRouter = express.Router();

ideasRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("ideas"));
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
  try {
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).send(newIdea);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

ideasRouter.param("ideaId", (req, res, next, id) => {
  const ideaId = id;
  const idea = getFromDatabaseById("ideas", ideaId);

  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  if (req.idea) {
    res.send(req.idea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  try {
    const updatedIdea = updateInstanceInDatabase("ideas", req.body);
    res.send(updatedIdea);
  } catch (error) {
    res.status(400).send();
  }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deleted = deleteFromDatabasebyId("ideas", req.params.ideaId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = ideasRouter;
