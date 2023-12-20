import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  age: {
    type: number,
  },
  identity: {
    type: number,
  },
  applicationReason: {
    type: string,
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
  profile_image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

export default mongoose.model("Application", ApplicationSchema);
