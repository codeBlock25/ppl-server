const express = require("express");
const Route = express.Router();
const { generate } = require("randomstring");

const crimeSchema = require("../model/crime");

Route.post("/", async (req, res) => {
  const { crime, date, court, sentenced, pic } = req.body;
  var count = generate({ length: 24, capitalization: "lowercase" });
  try {
    var newCrimeRecord = new crimeSchema({
      code: count,
      crime: crime,
      court: court,
      sentence: sentenced,
      sentence_date: date,
      pic: pic,
    });

    await newCrimeRecord
      .save()
      .then(() => {
        res.json({ msg: "Record set" });
      })
      .catch(() => {
        res.status(400).json({ msg: "Record not set" });
      });
  } catch (error) {
    res.status(400).json({ msg: "Errors found", error: error });
  }
});

Route.get("/", async (req, res) => {
  let { token } = req.query;
  if (token) {
    try {
      await crimeSchema
        .find()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      res.status(400).json({ err: error, msg: "Crimes not found" });
    }
  }
});

Route.get("/single", async (req, res) => {
  let { token, id } = req.query;
  if (token) {
    try {
      await crimeSchema
        .findOne({ _id: id })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(404).json(err);
          console.log(err);
        });
    } catch (error) {
      res.status(400).json({ err: error, msg: "Crimes not found" });
    }
  } else {
    res.status(400).json({ msg: "Invalid token" });
  }
});
module.exports = Route;
