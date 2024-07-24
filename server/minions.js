const minionsRouter = require("express").Router();
// const { getCorrectParam } = require("./api.js");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
} = require("./db.js");

// minionsRouter.param("minionId", getCorrectParam("minionId", "minions"));
minionsRouter.param("minionId", (req, res, next, value) => {
  const minionId = String(value);
  if (!getFromDatabaseById("minions", minionId)) {
    res.status(404).send("invalid ID!");
  }
  req.minionId = minionId;
  next();
});

minionsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("minions"));
});
minionsRouter.get("/:minionId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.minionId);
  res.send(minion);
});
minionsRouter.post("/", (req, res) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

module.exports = minionsRouter;
