import express from "express";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import policeSchema from "../model/staff";

const salt = bcryptjs.genSaltSync(10);
const route = express.Router();

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env["MaIL_ADDRESS"], // generated ethereal user
    pass: process.env["MAIL_PASSWORD"], // generated ethereal password
  },
});

route.post("/", async (req, res) => {
  let { station_id, full_name, rank, email, phone_num, avatar } = req.body;
  let staff_level;
  let ranked = rank.toLowerCase();
  let ray = ranked.split(" ");
  let marker = "PS-";
  ray.forEach((element: string) => {
    marker = `${marker}${element.substr(0, 1)}`;
  });
  let ps = `${marker}${Math.floor(Math.random() * 958894)}`;
  let password_used = crypto.randomBytes(6).toString("hex");
  let hashedPassword = bcryptjs.hashSync(password_used, salt);
  if (
    ranked === "inspector general" ||
    ranked === "deputy inspector-general of police" ||
    ranked === "assistant inspector-general of police"
  ) {
    staff_level = 1;
  } else if (
    ranked === "commissioner of police" ||
    ranked === "deputy commissioner of police" ||
    ranked === "assistant commissioner of police"
  ) {
    staff_level = 2;
  } else if (
    ranked === "chief superintendent of police" ||
    ranked === "superintendent of police" ||
    ranked === "deputy superintendent of police"
  ) {
    staff_level = 3;
  } else if (
    ranked === "assistant superintendent of police" ||
    ranked === "inspector of police" ||
    ranked === "sergeant major"
  ) {
    staff_level = 4;
  } else {
    staff_level = 5;
  }
  let newStaff = new policeSchema({
    station_id,
    full_name,
    office_id: ps,
    email,
    phone_num,
    password: hashedPassword,
    rank,
    staff_level,
    avatar,
  });

  await newStaff
    .save()
    .then(async () => {
      res.status(200).json({ msg: "user saved" });
      try {
        await transporter
          .sendMail({
            from: `server ${process.env["MAIL_ADDRESS"]}`, // sender address
            to: email, // list of receivers
            subject: "Officer Details", // Subject line
            html: `
            <center>
            <h1>Officer Details</h1>
            <img 
              src="data:image/jpeg;base64, ${avatar}" style="width: 200px; height: 200px, display: block; border-radius: 20px;"/>
            <h2>Your id ${ps} and password is ${password_used}</h2>
            <p>Full name: <b>${full_name}</b>
            </p>
            <p>
            Rank: <b>${ranked}
            </p>
            </center>
            `,
            // html body
          })
          .then(() => {
            console.log("message sent");
          });
      } catch (error) {
        console.error(error);
      }
    })
    .catch((err: { keyPattern: { email: any } }) => {
      if (err?.keyPattern?.email) {
        res.status(400).json({ msg: "A user with this email already exits." });
        return;
      }
      res.status(400).json({ msg: "user not saved" });
    });
});

export default route;
