import express from "express";
import firSchema from "../model/fir";

const route = express.Router();

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
    .catch((err: any) => {
      res.status(400).json({ msg: "An error occurred", error: err });
    });
});

export default route;
