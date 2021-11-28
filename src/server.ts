const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//==============keys=============//
const databaseUrl =
  process.env.DATABASE || "mongodb://localhost:27017/police_data_base";
const port = process.env.PORT || 4000;
const server = express();
//==============end==============//

//============custom route============//
const customRoute = require("./customRoutes");
//============------------============//

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

mongoose
  .connect(databaseUrl, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
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
