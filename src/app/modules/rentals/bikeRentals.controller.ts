import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeRentalsService } from "./bikeRentals.service";

//destructuring bike rentals service
const {
  createBikeRentalsIntoDB,
  returnBikeToOwnerIntoDB,
  getAllRentalsFromDB,
} = bikeRentalsService;

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
const returnBikeToOwner = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const rentalsBikeId = req.params.id;
  const result = await returnBikeToOwnerIntoDB(rentalsBikeId);
  //set userId in result.userId from token
  result.userId = userId;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bike returned successfully",
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const result = await getAllRentalsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rentals retrieved successfully",
    data: result,
  });
});

export const bikeRentalsController = {
  createBikeRentals,
  returnBikeToOwner,
  getAllRentals,
};
