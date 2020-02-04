const express = require("express")
const route = express.Router()
const nodemailer = require("nodemailer")
const bcryptjs = require("bcryptjs")
const salt = bcryptjs.genSaltSync(10)
const crypto = require("crypto")
const policeSchema = require("../model/staff")


route.post("/", async (req,res)=> {
  let {
    station_id,
    full_name,
    rank,
    email,
    phone_num,
  } = req.body
  let staff_level
  let ranked = rank.toLowerCase()
  let passwordused = crypto.randomBytes(6).toString('hex')
  let hashedPassword = bcryptjs.hashSync(passwordused, salt)
  if (ranked === "inspector general" || ranked === "deputy inspector-general of police" || ranked === "assistant inspector-general of police") {
    staff_level = 1
  } else if (ranked === "commissioner of police" || ranked === "deputy commissioner of police" || ranked === "assistant commissioner of police") {
    staff_level = 2
  } else if (ranked === "chief superintendent of police" || ranked === "superintendent of police" || ranked === "deputy superintendent of police") {
    staff_level = 3
  } else if (ranked === "assistant superintendent of police" || ranked === "inspector of police" || ranked === "sergeant major") {
    staff_level = 4
  } else {
    staff_level = 5
  }
  let newSatff = new policeSchema({
    station_id: station_id,
    full_name: full_name,
    email: email,
    phone_num: phone_num,
    password: hashedPassword,
    rank: rank,
    staff_level,
  })
  console.log(passwordused)
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        username: "jamos56947@gmail.com", // generated ethereal user
        password: "Iamjamos735" // generated ethereal password
    }
  });
  try {
      let info = await transporter.sendMail({
        from: '"Amos John" <jamos56947@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "App ✔", // Subject line
        text: `your password ${passwordused}`, // plain text body
        html: "<b>Hello world?</b>" // html body
      });
      console.log(info)
  } catch (error) {
    console.log(error)
  }
    await newSatff.save().then(async ()=>{
        res.status(200).json({msg: "user saved"})
    })
    .catch(err=>{
        res.status(400).json({msg: "user not saved", error: err})
    })
})

module.exports = route