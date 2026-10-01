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
// @access  Public
export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!review) {
    return next(
      new CustomErrorHandlerAPI(
        `No review found with the ID of: ${req.params.id}`,
        400,
      ),
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc    Get single bootcamps
// @route   POST /api/v1/reviews/
// @access  Public
export const addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new CustomErrorHandlerAPI(
        `No bootcamp found with ID: ${req.params.bootcampId}`,
        400,
      ),
    );
  }

  // create review
  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});
