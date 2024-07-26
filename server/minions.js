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

minionsRouter.get("/", (_req, res) => {
  res.send(getAllFromDatabase("minions"));
});
minionsRouter.get("/:minionId", (req, res) => {
  const minion = getFromDatabaseById("minions", req.minionId);
  res.send(minion);
});
minionsRouter.post("/", (req, res) => {
  const newMinion = addToDatabase("minions", req.body);
  /*
  {
  name: 'Bob',
  title: 'Mini Minion',
  weaknesses: 'very small and short',
  salary: 2,
  id: '11'
  }
  */
  res.status(201).send(newMinion);
});
minionsRouter.put("/:minionId", (req, res) => {
  updateInstanceInDatabase("minions", req.body);
  res.status(200).send(req.body);
});
minionsRouter.delete("/:minionId", (req, res) => {
  deleteFromDatabasebyId("minions", req.minionId);
  res.status(204).send();
});

module.exports = minionsRouter;
