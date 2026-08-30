import CustomErrorHandlerAPI from "../helpers/customErrorHandlerAPI.js";

const customErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // mongoose bad objectId
  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    error = new CustomErrorHandlerAPI(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default customErrorHandler;
