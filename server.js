const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./models");
db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to gacoder.info" });
});
// set port, listen for requests
require("./routes/new.routes.js")(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});