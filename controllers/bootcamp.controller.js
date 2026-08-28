import Bootcamp from "../models/Bootcamp.models.js";

export const getBootcamps = (req, res, next) => {
  // @desc    Get all bootcamps
  // @route   GET /api/v1/bootcamps
  // @access  Public
  res.status(200).json({ enroll: true, msg: `GET bootcamp ${req.params.id}` });
};

export const getBootcamp = (req, res, next) => {
  // @desc    Get a single bootcamp
  // @route   GET /api/v1/bootcamps/:id
  // @access  Public
  res.status(200).json({ enroll: true, msg: `GET Single bootcamp ` });
};

export const createBootcamp = (req, res, next) => {
  // @desc    Create new bootcamp
  // @route   POST /api/v1/bootcamps/:id
  // @access  Private
  res.status(200).json({ enroll: true, msg: `POST new bootcamp` });
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
