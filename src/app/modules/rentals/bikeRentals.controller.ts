import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeRentalsService } from "./bikeRentals.service";
import config from "../../config";
import AppError from "../../config/error/AppError";

//destructuring bike rentals service
const { createBikeRentalsIntoDB } = bikeRentalsService;

const createBikeRentals = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const bikeRentalsData = req.body;
  const result = await createBikeRentalsIntoDB(bikeRentalsData);
  //ser userId in result.userId from token
  result.userId = userId;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental created successfully",
    data: result,
  });
});

export const bikeRentalsController = {
  createBikeRentals,
};
