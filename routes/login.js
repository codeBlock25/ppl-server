const express = require("express")
const routerr = express.Router()
const policeSchema = require("../model/staff")
const bcrypt = require("bcryptjs")

routerr.get("/", async(req,res)=>{
    let {
        email,
        password
    } = req.query
    if (email === "" || password === "") {
        res.status(404).json({msg: "please provide a mail and password to login"})
        // return null
    }else {
        try {
            let found = await policeSchema.findOne({email: email})
            let confirmByPassword = bcrypt.compareSync(password, found.password)
            if (found && confirmByPassword === true) {
                res.json({
                    msg: "welcome officer",
                    info: found
                })
            } else {
                res.status(400).json({
                    msg: "invalid detail"
                })
            }
        } catch (error) {
            res.status(400).json({
                msg: "invalid detail",
                error: error
            })
        }
    }
})

module.exports = routerr 