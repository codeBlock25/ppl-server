const express = require("express")
const Route = express.Router()

const crimeSchema = require("../model/crime")

Route.post("/", async(req,res)=>{
    const {
        crime,
        date ,
        court ,
        sentenced
    } = req.body
    var count = 0
    await crimeSchema.countDocuments({},(err,counte)=>{
        count = counte
    }) 
    try {
        var newCrimeRecord = new crimeSchema({
            code: `cs00${count + 1}`,
            crime: crime,
            court: court,
            sentence: sentenced,
            sentence_date: date,
        })

        await newCrimeRecord.save().then(()=>{
            res.json({msg: "record set"})
        }).catch(()=>{
            res.status(400).json({msg: "record not set"})
        })
    } catch (error) {
        res.status(400).json({msg: "errors found", error: error})
    }

})

Route.get("/", async(req, res)=>{
    let {
        token
    } = req.query
    if (token) {
        try {
            await crimeSchema
            .find()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        } catch (error) {
            res.status(400).json({err: error, msg: "crimes not found"})
        }
    }
})

module.exports = Route