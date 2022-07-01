const errorHandling = (error, request, response, next) => {
  response
    .status(error.status || 500)
    .json({ message: error.message || "internal server error" });
  next();
};

module.exports = errorHandling;
