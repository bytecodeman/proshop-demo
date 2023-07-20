const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`); // originalUrl is the url that was requested
  res.status(404);
  next(error); // Pass error to error handler middleware
};

const errorHandler = (err, req, res, next) => {
  // Set status code to 500 if status code is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //Check for Mongoose bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // err.stack is the stack trace that will be displayed
  });
};

export { notFound, errorHandler };
