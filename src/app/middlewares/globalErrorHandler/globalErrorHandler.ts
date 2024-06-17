import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../../config/error/handleZodError";
import { TErrorSource } from "../../interface/error";
import config from "../../config";
import handleValidationError from "../../config/error/handleValidationError";
import handleDuplicateError from "../../config/error/handleDuplicateError";
import handleCastError from "../../config/error/handleCastError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = "something went wrong";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: errorSources,
    stack: config.node_env === "development" ? err?.stack : "error stack",
  });
};

export default globalErrorHandler;
