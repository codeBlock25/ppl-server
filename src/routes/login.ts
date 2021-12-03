import express from "express";
import policeSchema from "../model/staff";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", async (req, res) => {
  let { email, password } = req.query as { email: string; password: string };
  if (email === "" || password === "") {
    res
      .status(404)
      .json({ msg: "Please provide a mail and password to login" });
    // return null
  } else {
    try {
      let found = await policeSchema.findOne({ office_id: email });
      let confirmByPassword = bcrypt.compareSync(password, found.password);
      if (found && confirmByPassword === true) {
        res.json({
          msg: "Welcome officer",
          info: found,
        });
      } else {
        res.status(400).json({
          msg: "Invalid detail",
        });
      }
    } catch (error) {
      res.status(400).json({
        msg: "Invalid detail",
        error: error,
      });
    }
  }
});

export default router;
