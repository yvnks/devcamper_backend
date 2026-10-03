import asyncHandler from './asyncHandler.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import CustomErrorHandlerAPI from '../helpers/customErrorHandlerAPI.js';

// @TODO: protects routes
export const protect = asyncHandler(async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from bearer token in header.
    token = req.headers.authorization.split(' ')[1];
  } /*else if (req.cookies.token) {
    token = req.cookies.token;
  }
  */

  // Check if token exists.
  if (!token) {
    return next(
      new CustomErrorHandlerAPI(
        'You are not authorized to access this route',
        401,
      ),
    );
  }

  // Verify token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    
    if(!req.user){
      return next(new CustomErrorHandlerAPI(`You are not authorized to access this route.`, 401))
    }
  } catch (error) {
    return next(
      new CustomErrorHandlerAPI(
        'You are not authorized to access this route',
        401,
      ),
    );
  }
});

export const authorize = function (...roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return next(
        new CustomErrorHandlerAPI(
          `User role: ${req.user.role} is not authorized to access this route`,
          403,
        ),
      );
    }
    next();
  };
};
