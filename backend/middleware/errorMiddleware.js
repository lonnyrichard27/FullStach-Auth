//  we're creating this file because the default error page in express.js is an html page so now that we're using this middleware our errors will be formatted in a JSON format that has an error message

// First: it will be used to catch errors for routes that doesn't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// Second:L
// notice the 'err' argument in the function below, this will allow express to know that this is a custom error middleware
const errorHandler = (err, req, res, next) => {
  // if the errorcode is 200 change it to 500 else then just use whatever error code it brings by default which is probably 400
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message;

  // in mongoose we have a weird error called the cast error so in the conditional below we don't want to depend on the default error message that is being used.
  if (err.name === 'castError' && err.kind === 'ObjectId') {
    // so if theres that cast error change the statuscode to 400 and change the error message to 'resource not found'
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message:message,
    // show the stacktrace error only if we're not in prod but in development mode.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

module.exports = { notFound, errorHandler }