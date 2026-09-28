import CustomErrorHandlerAPI from '../helpers/customErrorHandlerAPI.js';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/user.model.js';
import dayjs from 'dayjs';

/**
 * @desc GET all users
 * @route GET api/v1/users
 *  @access Private/Admin
 */
export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc GET user
 * @route GET api/v1/users/:id
 *  @access Private/Admin
 */
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    json: user,
  });
});

/**
 * @desc Create users
 * @route POST api/v1/admin/users
 *  @access Private/Admin
 */
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    json: user,
  });
});

/**
 * @desc UPDATE users
 * @route PATCH api/v1/users/:id
 *  @access Private/Admin
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runvalidators: true,
  });

  res.status(200).json({
    success: true,
    json: user,
  });
});

/**
 * @desc Delete users
 * @route DELETE api/v1/users/:id
 *  @access Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    json: {},
  });
});
