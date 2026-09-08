import Bootcamp from '../models/Bootcamp.model.js';
import CustomErrorHandlerAPI from '../helpers/customErrorHandlerAPI.js';
import asyncHandler from '../middleware/asyncHandler.js';
import geocoder from '../utils/app.geocoder.js';

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g, (match) => `$${match}`);
  console.log(queryStr);

  query = Bootcamp.find(JSON.parse(queryStr));
  const bootcamp = await query;

  res
    .status(200)
    .json({ success: true, count: bootcamp.length, data: bootcamp });
});

// @desc    Get a single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new CustomErrorHandlerAPI(
        `Bootcamp not found with ID of ${req.params.id}`,
        404,
      ),
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/:id
// @access  Private
export const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc    Update specific bootcamp
// @route   PATCH /api/v1/bootcamps/:id
// @access  Public
export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new CustomErrorHandlerAPI(
        `Bootcamp not found with ID of ${req.params.id}`,
        404,
      ),
    );
  }

  res.status(200).json({ enroll: true, data: bootcamp });
});

// @desc    Delete specific bootcamp
// @route   Delete /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ enroll: true, data: {} });
});

// @desc    Get bootcamps within a specific radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance measured in miles /ms
// @access  Private
export const getBootcampInRadius = asyncHandler(async (req, res, next) => {
  const radiusOfTheEarth = 3963;

  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lon = loc[0].longitude;

  // distance / radius_of_the_earth
  const radius = distance / radiusOfTheEarth;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lon, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
  console.log(req.params);
});
