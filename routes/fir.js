const express = require("express")
const route = express.Router()
const firSchema = require("../model/fir")
  
  
route.post("/", async (req,res)=>{
    let {
        officer_name,officer_email,
        pertitioner_name,
        pertitioner_contact,
        victim_name,
        victim_contact,
        victim_address,
        accused_name,
        accused_contact,
        accused_address,
        incident_date,
        incident_place,
        description
    } = req.body

    let newFirRecord = new firSchema({
        officer_name: officer_name,
        officer_email: officer_email,
        pertitioner_name: pertitioner_name,
        pertitioner_contact: pertitioner_contact,
        victim_name: victim_name,
        victim_contact: victim_contact,
        victim_address: victim_address,
        accused_name: accused_name,
        accused_contact: accused_contact,
        accused_address: accused_address,
        incident_date: incident_date,
        incident_place: incident_place,
        description: description,
        assigned_officer: "no officer"
    })
    newFirRecord.save().then(()=>{
        res.json({msg: "saved"})
    })
    .catch(err=>{
        res.status(400).json({msg: "an error occured", error: err})
    })
})


module.exports = route
