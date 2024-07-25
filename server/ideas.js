const ideasRouter = require("express").Router();
const getCorrectParam = require("./params.js");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  deleteFromDatabasebyId,
  updateInstanceInDatabase,
} = require("./db.js");

ideasRouter.param("ideaId", getCorrectParam("ideaId", "ideas"));

ideasRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("ideas"));
});
ideasRouter.get("/:ideaId", (req, res) => {
  res.send(getFromDatabaseById("ideas", req.ideaId));
});

ideasRouter.post("/", (req, res) => {
  const newIdea = addToDatabase("ideas", req.body);
  console.log(req.body);
  /*
  {
  name: 'New Idea',
  description: 'Help Bob',
  weeklyRevenue: 56789,
  numWeeks: 20,
  id: '11'
  }
  */
  res.status(201).send(newIdea);
});

ideasRouter.put("/:ideaId", (req, res) => {
  updateInstanceInDatabase("ideas", req.body);
  res.status(200).send(req.body);
});

ideasRouter.delete("/:ideaId", (req, res) => {
  deleteFromDatabasebyId("ideas", req.ideaId);
  res.status(204).send();
});

module.exports = ideasRouter;
