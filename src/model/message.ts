import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const messageModel = model("messages", messageSchema);
export default messageModel;
