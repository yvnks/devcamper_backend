import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a title'],
      maxlength: [100, 'Characters are more than 100'],
    },
    text: {
      type: String,
      required: [true, 'Please leave a review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, 'Please add a rating between 1 and 10'],
    },

    bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bootcamp',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent user for from submitting more than one review from bootcamp.
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });
export default mongoose.model('Review', ReviewSchema);
