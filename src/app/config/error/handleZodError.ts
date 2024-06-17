import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericsErrorResponse } from "../../interface/error";

const handleZodError = (err: ZodError): TGenericsErrorResponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: errorSources[0].message,
    errorSources,
  };
};

export default handleZodError;
