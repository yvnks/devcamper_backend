import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please add a course title'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Please enter a description'],
      maxlength: [500, 'Cannot be more than 500 characters'],
    },
    weeks: {
      type: String,
      required: [true, 'Please add the duration of the bootcamp'],
    },
    tuition: {
      type: Number,
      required: [true, 'Please add a tuition cost'],
    },
    minimumSkill: {
      type: String,
      required: [true, 'Please enter a minimum skill'],
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    scolarshipAvailable: {
      type: Boolean,
      default: false,
    },
    bootcamp: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Bootcamp',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Course', CourseSchema);
