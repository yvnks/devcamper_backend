import CustomErrorHandlerAPI from "../helpers/customErrorHandlerAPI.js";

const customErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(error);

  // mongoose bad objectId
  if (err.name === "CastError") {
    const message = `Resource not found with ID of ${err.value}`;
    error = new CustomErrorHandlerAPI(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate fields found.";
    // bad req
    error = new CustomErrorHandlerAPI(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default customErrorHandler;
