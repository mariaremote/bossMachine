const minionsRouter = require("express").Router();
const getCorrectParam = require("./params.js");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  deleteFromDatabasebyId,
  updateInstanceInDatabase,
} = require("./db.js");

minionsRouter.param("minionId", getCorrectParam("minionId", "minions"));
minionsRouter.param("workId", getCorrectParam("workId", "work"));

minionsRouter.get("/", (_req, res) => {
  res.send(getAllFromDatabase("minions"));
});
minionsRouter.get("/:minionId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.minionId);
  res.send(minion);
});

minionsRouter.get("/:minionId/work", (req, res) => {
  const minionWork = getAllFromDatabase("work").filter((minion) => {
    return minion.minionId === req.minionId;
  });
  res.send(minionWork);
});

minionsRouter.post("/", (req, res) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

minionsRouter.post("/:minionId/work", (req, res) => {
  const newWorkForMinion = req.body;
  addToDatabase("work", newWorkForMinion);
  res.status(201).send(newWorkForMinion);
});

minionsRouter.put("/:minionId", (req, res) => {
  updateInstanceInDatabase("minions", req.body);
  res.status(200).send(req.body);
});

minionsRouter.put("/:minionId/work/:workId", (req, res) => {
  if (req.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updateInstanceInDatabase("work", req.body);
    res.status(200).send(req.body);
  }
});

minionsRouter.delete("/:minionId", (req, res) => {
  deleteFromDatabasebyId("minions", req.minionId);
  res.status(204).send();
});

minionsRouter.delete("/:minionId/work/:workId", (req, res) => {
  deleteFromDatabasebyId("work", req.workId);
  res.status(204).send();
});
module.exports = minionsRouter;
