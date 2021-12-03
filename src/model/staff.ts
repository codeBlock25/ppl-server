import { Schema, model } from "mongoose";

const newSchema = new Schema({
  station_id: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  office_id: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone_num: {
    type: Number,
    required: true,
    unique: true,
  },
  full_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
    lowercase: true,
  },
  staff_level: {
    type: Number,
    required: true,
  },
  avatar: {
    type: Buffer,
  },
});

const staffModel = model("staffPoc", newSchema);
export default staffModel;
