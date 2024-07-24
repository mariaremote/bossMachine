const express = require("express");
const apiRouter = express.Router();
// const {
//   getAllFromDatabase,
//   getFromDatabaseById,
//   addToDatabase,
// } = require("./db.js");

// routing
const minionsRouter = require("./minions.js");
const ideasRouter = require("./ideas.js");
const meetingsRouter = require("./meetings.js");

apiRouter.use("/minions", minionsRouter);
apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/meetings", meetingsRouter);

// handle params
// const getCorrectParam = (param, dbModel) => {
//   return (req, res, next, value) => {
//     const id = String(value);
//     if (!getFromDatabaseById(dbModel, id)) {
//       return res.status(404).send("invalid ID!");
//     }
//     req[param] = id;
//     next();
//   };
// };

module.exports = apiRouter;
