const express = require("express");
const route = express.Router();
const firSchema = require("../model/fir");
const officerSchema = require("../model/staff");

route.get("/", async (req, res) => {
  await firSchema
    .find()
    .then((data) => {
      res.json({ cases: data });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});
route.get("/case", async (req, res) => {
  let { id } = req.query;
  let assignableStaff = [];
  let level4 = await officerSchema.find({ staff_level: 3 });
  for (let a = 0; a < level4.length; a++) {
    assignableStaff.push({ name: level4[a].full_name, email: level4[a].email });
  }
  await firSchema
    .findById(id)
    .then((data) => {
      res.json({ case: data, officers: assignableStaff });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});
route.put("/", async (req, res) => {
  let { id, assignedStaff } = req.body;

  await firSchema
    .findByIdAndUpdate(id, { assigned_officer: assignedStaff })
    .then(() => {
      res.json({ msg: "officer assigned" });
    })
    .catch((err) => {
      res.json({ msg: "officer not assigned", error: err });
    });
});

module.exports = route;
