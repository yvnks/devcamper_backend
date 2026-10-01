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

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  // aggregation returns a promise.
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating,
    });
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.getAverageRating(this.bootcamp);
});
ReviewSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await this.constructor.getAverageRating(this.bootcamp);
  },
);

export default mongoose.model('Review', ReviewSchema);
