const express = require("express");
const route = express.Router();
const firSchema = require("../model/fir");

route.post("/", async (req, res) => {
  let {
    officer_name,
    officer_email,
    petitioner_name,
    petitioner_contact,
    victim_name,
    victim_contact,
    victim_address,
    accused_name,
    accused_contact,
    accused_address,
    incident_date,
    incident_place,
    description,
  } = req.body;

  let newFirRecord = new firSchema({
    officer_name,
    officer_email,
    petitioner_name,
    petitioner_contact,
    victim_name,
    victim_contact,
    victim_address,
    accused_name,
    accused_contact,
    accused_address,
    incident_date,
    incident_place,
    description,
    assigned_officer: "no officer",
  });
  newFirRecord
    .save()
    .then(() => {
      res.json({ msg: "Saved" });
    })
    .catch((err) => {
      res.status(400).json({ msg: "An error occurred", error: err });
    });
});

module.exports = route;
