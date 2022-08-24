const { CustomAPIError } = require("../error/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(404).json({ msg: "Something went wrong, Please try again later"})
};

module.exports = errorHandler;
