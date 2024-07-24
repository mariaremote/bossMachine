const meetingsRouter = require("express").Router();
// const { getCorrectParam } = require("./api.js");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  createMeeting,
} = require("./db.js");

// meetingsRouter.param("meetingId", getCorrectParam("meetingId", "meetings"));
meetingsRouter.param("meetingId", (req, res, next, value) => {
  const meetingId = String(value);
  if (!getFromDatabaseById("meetings", meetingId)) {
    res.status(404).send("invalid ID!");
  }
  req.meetingId = meetingId;
  next();
});

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

module.exports = meetingsRouter;
