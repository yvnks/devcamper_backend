import Bootcamp from "../models/Bootcamp.models.js";
import CustomErrorHandlerAPI from "../helpers/customErrorHandlerAPI.js";

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.find({});
  console.log(req.body);
  res
    .status(200)
    .json({ success: true, count: bootcamp.length, data: bootcamp });
};

// @desc    Get a single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    // });
    next(err);
  }
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/:id
// @access  Private
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    console.log(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Update specific bootcamp
// @route   PATCH /api/v1/bootcamps/:id
// @access  Public
export const updateBootcamp = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc    Delete specific bootcamp
// @route   Delete /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ enroll: true, data: {} });
  } catch (err) {
    next(err);
  }
};
