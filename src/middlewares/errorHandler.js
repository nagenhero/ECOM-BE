export const errorHandler = (error, req, res, next) => {
  console.log("11", error);
  let statusCode = error.statusCode || 500;
  let message = error.message || "intenral server error";
  if (message.includes("E11000")) {
    statusCode = 400;
    message = "DUPLICATE USER";
  }
  return res.status(statusCode).send({
    message: message,
    status: "error",
  });
};
