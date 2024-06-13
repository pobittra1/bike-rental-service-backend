import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";

//destructuring service
const { userRegisterIntoDB, loginUser } = authService;

const userRegister = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await userRegisterIntoDB(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

export const authController = {
  userRegister,
  userLogin,
};
