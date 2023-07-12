const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

require("dotenv").config();
const port = process.env.port || 3000;

global.__basedir = __dirname + "/..";
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", require("./routes/user"));
app.use("/notes", require("./routes/notes"));
app.get("/", (req, res) => {
  res.send("Hello User! This is Keeper API");
});

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Keeper App backend working on the port ${port}`);
});
