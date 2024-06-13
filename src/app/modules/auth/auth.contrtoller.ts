import jwt from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../config/error/AppError";

//destructuring service
const { userRegisterIntoDB, loginUser, getProfileFromDB, updateProfileInDB } =
  authService;

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
  const result = await loginUser(req.body);
  const token = result.token;
  const { _id, name, email, phone, address, role } = result.user;
  // const { _id, name, email, phone, address, role } = result.user;
  // const token = result.token;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: token,
    data: {
      _id,
      name,
      email,
      phone,
      address,
      role,
    },
  });
});

const getProfile = catchAsync(async (req, res) => {
  const tokenData = req.user;
  const result = await getProfileFromDB(tokenData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const tokenData = req.user;
  const updateData = req.body;
  const result = await updateProfileInDB(tokenData, updateData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: result,
  });
});

export const authController = {
  userRegister,
  userLogin,
  getProfile,
  updateProfile,
};
