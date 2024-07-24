const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");

module.exports = app;

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4001;

// prefix for static files
app.use("/public", express.static("./public"));

// middleware for logging
app.use(morgan("dev"));

// middleware for handling CORS requests from index.html
app.use(cors());

// middware for parsing request bodies
app.use(bodyParser.json());

// route the root URL to index.html
app.get("/", (_req, res) => {
  const index = fs.readFileSync("index.html", "utf8");
  res.send(index);
});

// Routers
const apiRouter = require("./server/api");
app.use("/api", apiRouter);

// error handling and 404 page display
app.use((_req, res) => {
  res.status(404).send("Not a valid URL!");
});

// This conditional is here for testing purposes:
if (!module.parent) {
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
}
