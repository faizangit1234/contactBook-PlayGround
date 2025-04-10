const constants = require('../constants.js');
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;
  res.status(statusCode); // ✅ Ensure status is always set

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'unprocessable entity',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: 'UNAUTHORIZED',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: 'FORBIDDEN',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: 'NOT_FOUND',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: 'SERVER_ERROR',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      if (!res.headersSent) {
        res.status(statusCode).json({
          title: 'Error',
          message: err.message,
          stackTrace: err.stack,
        });
      }
      break;
  }
};

module.exports = { errorHandler };
