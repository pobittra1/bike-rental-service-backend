import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";

//destructuring service
const { userRegisterIntoDB } = authService;

const userRegister = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userRegisterIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const authController = {
  userRegister,
};
