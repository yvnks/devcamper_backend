import Bootcamp from "../models/Bootcamp.models.js";

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = async (req, res, next) => {
  const bootcamp = await Bootcamp.find({});
  console.log(req.body);
  res.status(200).json({ success: true, data: bootcamp });
};

export const getBootcamp = (req, res, next) => {
  // @desc    Get a single bootcamp
  // @route   GET /api/v1/bootcamps/:id
  // @access  Public
  res.status(200).json({ enroll: true, msg: `GET Single bootcamp ` });
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/:id
// @access  Private
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    console.log(req.body);
    res.status(201).json({ success: true, data: bootcamp });
  } catch (error) {
    res.status(401).json({
      success: false,
      data: null,
    });
  }
};

export const updateBootcamp = (req, res, next) => {
  // @desc    Update specific bootcamp
  // @route   PATCH /api/v1/bootcamps/:id
  // @access  Public
  res.status(201).json({ enroll: true, msg: `PATCH new bootcamp` });
};

export const deleteBootcamp = (req, res, next) => {
  // @desc    Delete specific bootcamp
  // @route   Delete /api/v1/bootcamps/:id
  // @access  Private
  res.status(200).json({ enroll: true, msg: `Delete new bootcamp` });
};
