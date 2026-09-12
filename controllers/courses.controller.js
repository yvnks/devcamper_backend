import Bootcamp from '../models/Bootcamp.model.js';
import CustomErrorHandlerAPI from '../helpers/customErrorHandlerAPI.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Course from '../models/courses.model.js';
import customErrorHandler from '../middleware/customErrorHandler.js';

// @desc    Get all bootcamps
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

export const getCourse = asyncHandler(async function (req, res, next) {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new CustomErrorHandlerAPI(`No Course found with ID: ${req.params.id}`),
    );
  }

  res.status(200).json({
    success: true,
    data: course,
    count: course.length,
  });
});

/**
 * adds a course to the db
 */
export const addCourse = asyncHandler(async function (req, res, next) {
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});
