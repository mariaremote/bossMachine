const ideasRouter = require("express").Router();
// const { getCorrectParam } = require("./api.js");
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
} = require("./db.js");

// ideasRouter.param("ideaId", getCorrectParam("ideaId", "ideas"));
ideasRouter.param("ideaId", (req, res, next, value) => {
  const ideaId = String(value);
  if (!getFromDatabaseById("ideas", ideaId)) {
    res.status(404).send("invalid ID!");
  }
  req.ideaId = ideaId;
  next();
});

ideasRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("ideas"));
});
ideasRouter.get("/:ideaId", (req, res) => {
  res.send(getFromDatabaseById("ideas", req.ideaId));
});

module.exports = ideasRouter;
