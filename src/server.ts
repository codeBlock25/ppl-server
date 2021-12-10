// http protocol
import express from "express";
// cross browser connection
import cors from "cors";
// interpret json
import bodyParser from "body-parser";
// connect with mongodb
import { connect } from "mongoose";
//============custom route============//
import customRoute from "./customRoutes";
//============------------============//

//==============keys=============//
// declaring constants
const databaseUrl =
  process.env["DATABASE"] || "mongodb://localhost:27017/police_data_base";
const port = process.env["PORT"] || 4000;
const server = express();
//==============end==============//

// Adds buffer to json function
server.use(bodyParser.json());
// apply to all
server.use(bodyParser.urlencoded({ extended: false }));
// declare open
server.use(cors());

// creating a database connection
connect(databaseUrl, {})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`Database couldn't connect`, `error: ${err}`);
  });

// declaring routes
server.use("/api", customRoute);

// setting a listener
server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
