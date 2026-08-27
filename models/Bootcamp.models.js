import mongoose from "mongoose";

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    unique: true,
    trim: true,
    maxlength: [50, "Cannot be more than 50 characters"],
  },
});
