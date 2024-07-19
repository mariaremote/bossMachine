const express = require("express");
const apiRouter = express.Router();
const db = require("./db.js");

const getCorrectParam = (param, dbModel) => {
  return (req, res, next, value) => {
    const id = String(value);
    if (!db.getFromDatabaseById(dbModel, id)) {
      return res.status(404).send("invalid ID!");
    }
    req[param] = id;
    next();
  };
};

apiRouter.param("minionId", getCorrectParam("minionId", "minions"));
//     (req, res, next, value) => {
//   const minionId = String(value);
//   if (!db.getFromDatabaseById("minions", minionId)) {
//     res.status(404).send("invalid ID!");
//   }
//   req.minionId = minionId;
//   next();
// });

apiRouter.param("ideaId", getCorrectParam("ideaId", "ideas"));
//     (req, res, next, value) => {
//   const ideaId = String(value);
//   if (!db.getFromDatabaseById("ideas", ideaId)) {
//     res.status(404).send("invalid ID!");
//   }
//   req.ideaId = ideaId;
//   next();
// });

apiRouter.param("meetingId", getCorrectParam("meetingId", "meetings"));
//     (req, res, next, value) => {
//   const meetingId = String(value);
//   if (!db.getFromDatabaseById("meetings", meetingId)) {
//     res.status(404).send("invalid ID!");
//   }
//   req.meetingId = meetingId;
//   next();
// });

apiRouter.get("/minions", (req, res) => {
  res.send(db.getAllFromDatabase("minions"));
});
apiRouter.get("/minions/:minionId", (req, res) => {
  const minion = db.getFromDatabaseById("minions", req.minionId);
  res.send(minion);
});

apiRouter.get("/ideas", (req, res) => {
  res.send(db.getAllFromDatabase("ideas"));
});
apiRouter.get("/ideas/:ideaId", (req, res) => {
  res.send(db.getFromDatabaseById("ideas", req.ideaId));
});

apiRouter.get("/meetings", (req, res) => {
  res.send(db.getAllFromDatabase("meetings"));
});
apiRouter.get("/meetings/:meetingId", (req, res) => {
  res.send(db.getFromDatabaseById("meetings", req.meetingId));
});

module.exports = apiRouter;
