import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  code: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  age: {
    type: Number,
  },
  identity: {
    type: Number,
  },
  applicationReason: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  place: {
    type: String,
  },
  address: {
    type: String,
  },
  application_image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

export default mongoose.model("Application", ApplicationSchema);
