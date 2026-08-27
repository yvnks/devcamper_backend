/**
 * @desc {loggerMiddleware} logs request to console.
 */
const loggerMiddleware = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`,
  );
  next();
};

export default loggerMiddleware;
