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
const databaseUrl =
  process.env["DATABASE"] || "mongodb://localhost:27017/police_data_base";
const port = process.env["PORT"] || 4000;
const server = express();
//==============end==============//

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

connect(databaseUrl, {})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`Database couldn't connect`, `error: ${err}`);
  });

server.use("/api", customRoute);

server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
