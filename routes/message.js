const express = require("express")
const route = express.Router()

const staffSchema = require("../model/staff")
const messageSchema = require("../model/message")

route.post("/", async (req,res)=>{
    const {
        message,
        from,
        to
    } = req.body
    var myMsg = await messageSchema.find({from: from, to: from})
    try {
        let newMsg = new messageSchema({
            message: message,
            from: from,
            to: to
        })
        await newMsg.save().then(()=>{
            res.json({msg: message, mssg: myMsg})
        })
    } catch (err) {
        res.status(400).json({msg:"not sent!", error: err})
    }
})

route.get("/", async(req,res)=>{
    const {
        from
    } = req.query
    try {
    var myMsg = await messageSchema.find({from: from, to: from})
    res.json(myMsg)
    } catch (err){
        res.status(400).json({err: err})
    }

})
route.get("/staffs", async(req,res)=>{
    var staff_name = []
    try {
        var staff = await staffSchema.find()
        if (staff) {
            for (let s = 0; s < staff.length; s++) {
                staff_name.push(staff[s].email)
            }
            res.json(staff_name)
        } else {

            res.send("no data")
        }
    } catch (err){
        res.status(400).json({err: err})
    }
})

module.exports = route