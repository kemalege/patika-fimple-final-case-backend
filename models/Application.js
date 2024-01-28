import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  code: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Solved", "Rejected"],
    default: "Pending",
  },
  firstName: {
    type: String,
  },
  lastName: {
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
  answers : [
    {
        type : mongoose.Schema.ObjectId,
        ref : "Answer"
    }
]
});

export default mongoose.model("Application", ApplicationSchema);
