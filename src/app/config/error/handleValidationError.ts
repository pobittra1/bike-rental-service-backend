import mongoose from "mongoose";
import { TErrorSource, TGenericsErrorResponse } from "../../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericsErrorResponse => {
  const errorSources: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: errorSources[0].message,
    errorSources,
  };
};

export default handleValidationError;
