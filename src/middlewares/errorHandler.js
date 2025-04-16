const errorHandler = (err, req, res, next) => {
  const statusCode = res.status || err.status || 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: 'bad request',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 401:
      res.json({
        title: 'unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 403:
      res.json({
        title: 'forbidden , not allowed',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 404:
      res.json({
        title: 'not found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case 500:
      res.json({
        title: 'server error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: err.title,
        message: err.message,
        stackTrace: err.stack,
      });
  }
};

module.exports = errorHandler;
