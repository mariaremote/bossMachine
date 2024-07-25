const meetingsRouter = require("express").Router();
const getCorrectParam = require("./params.js");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require("./db.js");

meetingsRouter.param("meetingId", getCorrectParam("meetingId", "meetings"));

meetingsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("meetings"));
});

meetingsRouter.get("/:meetingId", (req, res) => {
  res.send(getFromDatabaseById("meetings", req.meetingId));
});

meetingsRouter.post("/", (req, res) => {
  const newMeeting = addToDatabase("meetings", createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (_req, res) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetingsRouter;
