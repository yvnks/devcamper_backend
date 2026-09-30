import Review from '../models/reviews.models.js';
import Bootcamp from '../models/Bootcamp.model.js';
import CustomErrorHandlerAPI from '../helpers/customErrorHandlerAPI.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get all bootcamps
// @route   GET /api/v1/reviews
// @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public
export const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    res.status(200).json({
      success: true,
      data: reviews,
      length: reviews.length,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single bootcamps
// @route   GET /api/v1/reviews/:id
// @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public
export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!review) {
    return next(
      new CustomErrorHandlerAPI(
        `No review found with the ID of: ${req.params.id}`, 400
      ),
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});
