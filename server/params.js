const { getFromDatabaseById } = require("./db.js");

const getCorrectParam = (param, dbModel) => {
  return (req, res, next, value) => {
    const id = String(value);
    if (!getFromDatabaseById(dbModel, id)) {
      return res.status(404).send("invalid ID!");
    }
    req[param] = id;
    next();
  };
};

module.exports = getCorrectParam;
