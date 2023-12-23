const express = require("express");
const meetingsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("../../server/db");

meetingsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  try {
    const newMeeting = addToDatabase("meetings", createMeeting());
    res.status(201).send(newMeeting);
  } catch (error) {
    res.status(400).send();
  }
});

meetingsRouter.delete("/", (req, res, next) => {
  try {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = meetingsRouter;
