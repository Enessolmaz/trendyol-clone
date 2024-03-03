import mongoose from "mongoose";


const { Schema } = mongoose


const DATA_USER = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
})

export const USER = mongoose.model("user", DATA_USER);