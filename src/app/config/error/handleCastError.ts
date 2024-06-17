import mongoose from "mongoose";
import { TErrorSource, TGenericsErrorResponse } from "../../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericsErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: errorSources[0].message,
    errorSources,
  };
};

export default handleCastError;
