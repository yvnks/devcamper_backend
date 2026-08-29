
const customErrorHandler = (err, req, res, next) => {
  console.log(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    err: err.message || 'Server Error'
  });
};

export default customErrorHandler;
