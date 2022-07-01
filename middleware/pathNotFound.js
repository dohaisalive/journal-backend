const pathNotFound = (request, response, next) => {
  response.status(404).json({ message: "path not found" });
  next();
};

module.exports = pathNotFound;
