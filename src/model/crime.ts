import { Schema, model } from "mongoose";

const crimeSchema = new Schema({
  code: {
    type: String,
    required: true,
    lowercase: true,
  },
  crime: {
    type: String,
    required: true,
    lowercase: true,
    maxlength: 70,
  },
  court: {
    type: String,
    required: true,
    lowercase: true,
  },
  sentence: {
    type: String,
    required: true,
    lowercase: true,
  },
  sentence_date: {
    type: Date,
    required: true,
  },
  pic: {
    type: Buffer,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const crimeModel = model("crime", crimeSchema);
export default crimeModel;
