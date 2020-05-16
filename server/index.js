require("dotenv").config({ path: "../.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const { connect, initDb } = require("./app/db");
const router = require("./app/router");

(async () => {
  await connect();
  await initDb();

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use("/", router);
  app.listen(process.env.APP_PORT, () =>
    console.log(`visit the app at http://localhost:${process.env.APP_PORT}`)
  );
})();
